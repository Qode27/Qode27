"""
Kunsalt Job Portal Dashboard
Professional job search platform (Education | Jobs | Business)
Beige + White theme, LinkedIn/Indeed dashboard UI style
"""
import streamlit as st
import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Import tab render functions
from pages.home import render as render_home
from pages.education import render as render_education
from pages.jobs import render as render_jobs
from pages.business import render as render_business

# =====================================================
# PAGE CONFIG
# =====================================================
st.set_page_config(
    layout="wide",
    page_title="Kunsalt - Jobs Dashboard",
    page_icon="💼",
    initial_sidebar_state="expanded",
)

# =====================================================
# BEIGE + WHITE THEME - JOB PORTAL DASHBOARD
# =====================================================
st.markdown("""
<style>
    /* Naukri.com Style Color Palette - Beige · Brown · Cream */
    :root {
        --primary-bg: #F6F1EB;         /* Main page background (cream beige) */
        --sidebar-bg: #EFE6DB;         /* Sidebar background */
        --card-bg: #FFFFFF;            /* Card/table background */
        --separator: #E2D6C7;          /* Section separators */
        --accent: #7A5C3E;             /* Primary brown */
        --accent-secondary: #9C7A5A;   /* Secondary brown */
        --hover-highlight: #D8C3A5;    /* Hover highlight */
        --border: #E2D6C7;             /* Subtle border */
        --text-primary: #2B2B2B;       /* Primary text */
        --text-secondary: #5A4A3C;     /* Secondary text */
        --text-muted: #8A7A6A;         /* Muted text */
        --link: #7A5C3E;               /* Links (brown tone) */
        --card-radius: 6px;
        --spacing: 12px;
        --duration: 160ms;
        --ease: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Global Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, main {
        background: var(--primary-bg) !important;
        color: var(--text-primary) !important;
        font-family: 'Segoe UI', Arial, sans-serif !important;
        line-height: 1.5;
        font-size: 0.95rem;
    }

    .main {
        background: var(--primary-bg) !important;
    }

    /* Animations */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(8px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .fade-in-up {
        animation: fadeInUp var(--duration) var(--ease) forwards;
    }

    .fade-in {
        animation: fadeIn var(--duration) var(--ease) forwards;
    }

    /* Typography */
    h1 {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--accent);
        margin-bottom: 0.5rem;
    }

    h2 {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--accent-secondary);
        margin-bottom: 0.75rem;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
    }

    p {
        color: var(--text-secondary);
        font-size: 0.92rem;
        line-height: 1.45;
    }

    /* Cards */
    .card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: var(--card-radius);
        padding: 14px 18px;
        transition: box-shadow var(--duration) var(--ease), border-color var(--duration) var(--ease);
        box-shadow: 0 1px 2px rgba(122, 92, 62, 0.07);
    }

    .card:hover {
        box-shadow: 0 2px 8px rgba(122, 92, 62, 0.13);
        border-color: var(--accent-secondary);
        background: var(--hover-highlight);
    }

    /* Buttons */
    button {
        border-radius: 6px;
        font-weight: 500;
        transition: all var(--duration) var(--ease);
        border: none;
    }

    button[kind="primary"] {
        background: var(--accent) !important;
        color: #fff !important;
        padding: 8px 18px !important;
        border-radius: 6px !important;
        border: 1px solid var(--accent) !important;
        font-weight: 600 !important;
        cursor: pointer !important;
        font-size: 0.95rem !important;
    }

    button[kind="primary"]:hover {
        background: var(--accent-secondary) !important;
        border-color: var(--accent-secondary) !important;
        box-shadow: 0 2px 8px rgba(122, 92, 62, 0.13) !important;
    }

    button[kind="secondary"] {
        background: var(--primary-bg) !important;
        color: var(--accent) !important;
        border: 1px solid var(--border) !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        padding: 10px 20px !important;
    }

    button[kind="secondary"]:hover {
        background: var(--sidebar-bg) !important;
        border-color: var(--accent) !important;
    }

    /* Inputs */
    input, select, textarea {
        border: 1px solid var(--border) !important;
        border-radius: 6px !important;
        background: white !important;
        color: var(--text-primary) !important;
        padding: 10px 12px !important;
        transition: all 0.15s ease !important;
        font-size: 0.9rem !important;
    }

    input::placeholder {
        color: var(--text-muted) !important;
    }

    input:focus, select:focus, textarea:focus {
        border-color: var(--accent) !important;
        box-shadow: 0 0 0 3px rgba(139, 111, 78, 0.1) !important;
        outline: none !important;
    }

    /* Badges */
    .badge {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 500;
        background: var(--sidebar-bg);
        color: var(--accent);
        border: 1px solid var(--border);
    }

    .badge.remove {
        cursor: pointer;
        padding: 4px 8px;
        margin-left: 4px;
        background: transparent;
        color: var(--text-muted);
        border: none;
    }

    .badge.remove:hover {
        color: #d32f2f;
    }

    /* Navbar */
    .navbar-container {
        position: sticky;
        top: 0;
        z-index: 999;
        background: var(--card-bg);
        border-bottom: 1px solid var(--separator);
        padding: 0.5rem 1.5rem;
        box-shadow: 0 1px 2px rgba(122, 92, 62, 0.07);
    }

    .navbar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1400px;
        margin: 0 auto;
        gap: 2rem;
    }

    .navbar-brand {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--accent);
        white-space: nowrap;
    }

    .tab-switcher {
        display: flex;
        gap: 0;
        flex: 1;
        justify-content: center;
    }

    .tab-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        background: transparent;
        color: var(--text-secondary);
        font-weight: 500;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all var(--duration) var(--ease);
        position: relative;
        border-bottom: 2px solid transparent;
    }

    .tab-btn:hover {
        color: var(--accent);
        background: transparent;
    }

    .tab-btn.active {
        color: var(--accent);
        background: transparent;
        border-bottom: 2px solid var(--accent);
        font-weight: 600;
    }

    /* Sidebar */
    [data-testid="stSidebar"] {
        background: var(--sidebar-bg) !important;
    }

    [data-testid="stSidebar"] [data-testid="stElementContainer"] {
        background: var(--sidebar-bg) !important;
    }

    /* Dashboard Grid */
    .dashboard-container {
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 1.25rem;
        padding: 1.25rem 1.5rem;
        max-width: 1280px;
        margin: 0 auto;
    }

    .sidebar-filters {
        background: var(--sidebar-bg);
        border: 1px solid var(--border);
        border-radius: var(--card-radius);
        padding: 1.1rem 1rem;
        height: fit-content;
        position: sticky;
        top: 56px;
        box-shadow: 0 1px 2px rgba(122, 92, 62, 0.07);
    }

    .results-area {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .filter-section {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--separator);
    }

    .filter-section:last-child {
        border-bottom: none;
    }

    .filter-label {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--accent);
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.4px;
    }

    .filter-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }

    /* Skills Chips */
    .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .skill-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: var(--sidebar-bg);
        color: var(--accent);
        border: 1px solid var(--border);
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
    }

    .skill-chip .remove-btn {
        cursor: pointer;
        font-weight: bold;
        color: var(--text-muted);
        margin-left: 4px;
    }

    .skill-chip .remove-btn:hover {
        color: #d32f2f;
    }

    /* Results List */
    .result-item {
        background: var(--card-bg);
        border: none;
        border-radius: 0;
        padding: 0.85rem 0.5rem;
        margin-bottom: 0;
        border-bottom: 1px solid var(--separator);
        transition: background var(--duration) var(--ease);
    }

    .result-item:hover {
        background: var(--hover-highlight);
    }

    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.4rem;
    }

    .result-title {
        font-size: 1.05rem;
        font-weight: 700;
        color: var(--accent);
        margin: 0;
    }

    .result-meta {
        display: flex;
        gap: 1.2rem;
        margin-bottom: 0.4rem;
        font-size: 0.88rem;
        color: var(--text-secondary);
    }

    .result-description {
        color: var(--text-muted);
        font-size: 0.92rem;
        margin-bottom: 0.5rem;
        line-height: 1.45;
    }

    .result-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-bottom: 0.3rem;
    }

    .result-actions {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
    }

    /* Sorting Row */
    .sort-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.1rem;
        padding: 0.7rem 1rem;
        background: var(--card-bg);
        border: 1px solid var(--separator);
        border-radius: var(--card-radius);
    }

    .sort-label {
        font-size: 0.9rem;
        color: var(--text-secondary);
        font-weight: 500;
    }

    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1.2rem;
        padding: 0.7rem;
    }

    .pagination button {
        min-width: 40px;
        height: 40px;
        padding: 0 !important;
        border-radius: 6px;
        border: 1px solid var(--border) !important;
        background: white !important;
        color: var(--text-primary) !important;
        font-weight: 500;
        cursor: pointer;
        transition: all var(--duration) var(--ease);
    }

    .pagination button:hover {
        border-color: var(--accent) !important;
        background: var(--sidebar-bg) !important;
    }

    .pagination button.active {
        background: var(--accent) !important;
        color: white !important;
        border-color: var(--accent) !important;
    }

    /* Search Bar */
    .search-container {
        display: flex;
        gap: 0.7rem;
        margin-bottom: 1.1rem;
        background: var(--card-bg);
        border: 1px solid var(--separator);
        border-radius: var(--card-radius);
        padding: 0.7rem 1rem;
    }

    .search-input {
        flex: 1;
        padding: 10px 12px !important;
        border: 1px solid var(--border) !important;
        border-radius: 6px !important;
        font-size: 0.95rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .navbar-content {
            flex-direction: column;
            gap: 1rem;
        }

        .tab-switcher {
            width: 100%;
            justify-content: flex-start;
            overflow-x: auto;
        }

        .tab-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
        }

        .dashboard-container {
            grid-template-columns: 1fr;
            padding: 1rem;
        }

        .sidebar-filters {
            position: static;
            top: auto;
        }

        .sort-row {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
        }

        .search-container {
            flex-direction: column;
        }

        h1 { font-size: 1.25rem; }
        h2 { font-size: 1.1rem; }
    }

    /* Divider */
    hr {
        border: none;
        border-top: 1px solid var(--separator);
        margin: 0.7rem 0;
    }
</style>
""", unsafe_allow_html=True)

# =====================================================
# SESSION STATE & INITIALIZATION
# =====================================================
if "selected_tab" not in st.session_state:
    st.session_state.selected_tab = "Home"

if "last_search_results" not in st.session_state:
    st.session_state.last_search_results = []

# =====================================================
# GLOBAL NAVBAR (Sticky, Tab Switcher)
# =====================================================
st.markdown('<div class="navbar-container">', unsafe_allow_html=True)

navbar_col1, navbar_col2, navbar_col3 = st.columns([1, 2, 1])

with navbar_col1:
    st.markdown('<div class="navbar-brand">💼 kunsalt</div>', unsafe_allow_html=True)

with navbar_col2:
    col_home, col_ed, col_jobs, col_bus = st.columns([1, 1, 1, 1])

    with col_home:
        if st.button("🏠 Home", use_container_width=True, key="tab_home"):
            st.session_state.selected_tab = "Home"
            st.rerun()

    with col_ed:
        if st.button("🎓 Education", use_container_width=True, key="tab_education"):
            st.session_state.selected_tab = "Education"
            st.rerun()

    with col_jobs:
        if st.button("💼 Jobs", use_container_width=True, key="tab_jobs"):
            st.session_state.selected_tab = "Jobs"
            st.rerun()

    with col_bus:
        if st.button("🏢 Business", use_container_width=True, key="tab_business"):
            st.session_state.selected_tab = "Business"
            st.rerun()

with navbar_col3:
    st.markdown('<div style="text-align: right; font-size: 0.85rem; color: var(--text-muted);">👤 Login</div>', unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)

# =====================================================
# TAB CONTENT DISPATCH
# =====================================================
if st.session_state.selected_tab == "Home":
    render_home()
elif st.session_state.selected_tab == "Education":
    render_education()
elif st.session_state.selected_tab == "Business":
    render_business()
else:  # Jobs
    render_jobs()
