"""
Build 'Top 100 Global Universities' dataset for Kansalt Education tab.

Output:
- data/universities_top100.json

Sources:
- QS: "The world's top 100 universities" (used ONLY to get the top 100 list + QS profile links)

Notes:
- International tuition is not uniform across degrees. We store:
  - tuition_url (official if found)
  - intl_ug_fee_range_local / intl_pg_fee_range_local (nullable)
  - currency (nullable)
- You can later enrich fees per program, but this gives you a clean searchable dataset immediately.
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup


QS_TOP100_URL = "https://www.topuniversities.com/student-info/choosing-university/worlds-top-100-universities"
OUT_PATH = Path("data/universities_top100.json")


@dataclass
class UniversityRecord:
    rank: int
    name: str
    country: str
    city: Optional[str]
    qs_profile_url: str

    official_website: Optional[str]
    tuition_url: Optional[str]

    # Fee structure fields (nullable by default; fill if you enrich later)
    currency: Optional[str]
    intl_ug_fee_range_local: Optional[str]
    intl_pg_fee_range_local: Optional[str]

    # Broad courses/subjects (nullable – QS page does not guarantee program lists for each uni)
    courses_offered: List[str]


def _get(url: str, timeout: int = 25) -> str:
    r = requests.get(
        url,
        timeout=timeout,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; KansaltBot/1.0; +https://kansalt.com)"
        },
    )
    r.raise_for_status()
    return r.text


def _clean_text(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())


def _is_probably_official(url: str) -> bool:
    if not url:
        return False
    try:
        host = urlparse(url).netloc.lower()
    except Exception:
        return False
    # reject QS/internal links
    if "topuniversities.com" in host:
        return False
    return True


def _guess_tuition_url(official_site: str) -> Optional[str]:
    """
    Best-effort: try common tuition/fees pages without crawling the whole site.
    """
    if not official_site:
        return None

    candidates = [
        "tuition",
        "tuition-fees",
        "fees",
        "fee",
        "cost",
        "costs",
        "international/fees",
        "international/tuition",
        "admissions/fees",
        "admissions/tuition",
        "study/fees",
        "study/cost",
        "students/fees",
    ]

    # If official site already points to a specific page, keep it.
    base = official_site.rstrip("/")
    parsed = urlparse(base)
    if parsed.path and parsed.path not in ("", "/"):
        return base

    # try HEAD-like GET (some sites block HEAD)
    for suffix in candidates:
        test = f"{base}/{suffix}"
        try:
            html = _get(test, timeout=12)
            # If it returns HTML and isn't obviously a 404 page, accept it.
            if html and len(html) > 300 and "404" not in html.lower():
                return test
        except Exception:
            continue
    return None


def _extract_top100_from_qs(html: str) -> List[Tuple[int, str, str, Optional[str], str]]:
    """
    Returns list of tuples:
      (rank, name, country, city, qs_profile_url)
    QS page structure can change; we parse robustly:
      - Find blocks containing "QS World University Rank"
      - Identify the university link and the rank number near it
    """
    soup = BeautifulSoup(html, "html.parser")

    # Most reliable: the page contains repeating cards; rank is often plain text near the card.
    # We'll scan for anchor tags that look like university links + detect rank nearby.
    results: List[Tuple[int, str, str, Optional[str], str]] = []

    # Heuristic: university links on this page often appear as <a> with href containing "/universities/"
    # But sometimes it's general. We'll accept internal links that are not nav.
    anchors = soup.select('a[href^="/universities/"], a[href^="https://www.topuniversities.com/universities/"]')

    seen = set()
    for a in anchors:
        name = _clean_text(a.get_text(" ", strip=True))
        href = a.get("href") or ""
        if not name or len(name) < 3:
            continue

        qs_profile = href if href.startswith("http") else urljoin(QS_TOP100_URL, href)
        if qs_profile in seen:
            continue

        # Walk up to a container and try to find country + rank nearby
        container = a.parent
        for _ in range(6):
            if container is None:
                break
            text = _clean_text(container.get_text(" ", strip=True))
            # rank often appears as a standalone number (or "=94")
            m_rank = re.search(r"(?:^|\s)(=?\d{1,3})(?:\s|$)", text)
            # country line often like "Cambridge, United States" etc.
            m_loc = re.search(r"([A-Za-z .'-]+),\s*([A-Za-z .'-]+)", text)
            if m_rank and m_loc:
                raw_rank = m_rank.group(1).lstrip("=")
                try:
                    rank = int(raw_rank)
                except Exception:
                    rank = None

                city = _clean_text(m_loc.group(1))
                country = _clean_text(m_loc.group(2))

                if rank and 1 <= rank <= 100:
                    key = (rank, name, country)
                    if key not in seen:
                        results.append((rank, name, country, city, qs_profile))
                        seen.add(qs_profile)
                    break

            container = container.parent

    # Deduplicate + sort
    # Some ranks are tied (=94, =98). We'll include them and still sort by numeric rank.
    dedup: Dict[Tuple[int, str], Tuple[int, str, str, Optional[str], str]] = {}
    for item in results:
        dedup[(item[0], item[1])] = item

    final = sorted(dedup.values(), key=lambda x: (x[0], x[1].lower()))
    # Keep only first 100 ranks (ties might exceed 100 items; that's OK for your UI)
    return final


def _extract_official_site_from_qs_profile(qs_profile_url: str) -> Optional[str]:
    """
    Best-effort: QS profile pages sometimes include official website link.
    We try to find an external link on the page that isn't QS.
    """
    try:
        html = _get(qs_profile_url, timeout=20)
    except Exception:
        return None

    soup = BeautifulSoup(html, "html.parser")
    for a in soup.select("a[href]"):
        href = (a.get("href") or "").strip()
        if href.startswith("http") and _is_probably_official(href):
            # Filter obvious social links
            host = urlparse(href).netloc.lower()
            if any(s in host for s in ["facebook.", "twitter.", "x.com", "linkedin.", "instagram.", "youtube."]):
                continue
            return href
    return None


def build_dataset() -> List[UniversityRecord]:
    print("Fetching QS top-100 page...")
    html = _get(QS_TOP100_URL)
    items = _extract_top100_from_qs(html)

    if not items:
        raise RuntimeError("Could not parse QS top-100 list. QS page layout might have changed.")

    records: List[UniversityRecord] = []
    for rank, name, country, city, qs_profile in items:
        print(f"[{rank}] {name} ({country})")

        official = _extract_official_site_from_qs_profile(qs_profile)
        tuition = _guess_tuition_url(official) if official else None

        rec = UniversityRecord(
            rank=rank,
            name=name,
            country=country,
            city=city,
            qs_profile_url=qs_profile,
            official_website=official,
            tuition_url=tuition,
            currency=None,
            intl_ug_fee_range_local=None,
            intl_pg_fee_range_local=None,
            courses_offered=[],
        )
        records.append(rec)

    # Sort by rank
    records.sort(key=lambda r: (r.rank, r.name.lower()))
    return records


def main() -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    data = build_dataset()
    OUT_PATH.write_text(json.dumps([asdict(x) for x in data], indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"\nSaved: {OUT_PATH} ({len(data)} records)")


if __name__ == "__main__":
    main()

