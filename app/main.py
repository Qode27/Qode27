"""
Kansalt.com - Multi-Tab Platform (Education | Jobs | Business)
Light theme, premium SaaS design, live deployment ready.
"""
import streamlit as st
import sys
import os

# Add project root to path
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# Import tab render functions
from pages.education import render as render_education
from pages.jobs import render as render_jobs
from pages.business import render as render_business

# =====================================================
# PAGE CONFIG
# =====================================================
st.set_page_config(
    layout="wide",
    page_title="Kansalt - Education | Jobs | Business",
    page_icon="🌍",
    initial_sidebar_state="expanded",
)

# =====================================================
# LIGHT THEME - GLOBAL CSS (REDESIGNED)
# =====================================================
st.markdown("""
<style>
    /* Color Palette - Calm, Professional White-Blue */
    :root {
        --primary-blue: #2563EB;
        --secondary-blue: #3B82F6;
        --light-bg: #F5F9FF;
        --white: #FFFFFF;
        --light-gray: #F8FAFC;
        --text-primary: #0F172A;
        --text-secondary: #475569;
        --text-muted: #64748B;
        --border: #E2E8F0;
    }

    /* Global Reset & Base */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body {
        background: var(--white) !important;
        color: var(--text-primary) !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        line-height: 1.6;
    }

    .main {
        background: var(--white) !important;
    }

    /* Typography - Clean Hierarchy */
    h1 {
        font-size: 2.25rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
    }

    h2 {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        margin-top: 1.5rem;
        letter-spacing: -0.01em;
    }

    h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    p {
        color: var(--text-secondary);
        font-size: 0.95rem;
    }

    /* Spacing - Generous whitespace */
    section {
        padding: 2rem 0;
    }

    /* Cards - Subtle, Clean */
    .card {
        background: var(--white);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.2s ease;
    }

    .card:hover {
        border-color: var(--primary-blue);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);
    }

    /* Buttons - Clean & Clear */
    button {
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.15s ease;
        border: none;
    }

    button[kind="primary"] {
        background: var(--primary-blue) !important;
        color: white !important;
        padding: 10px 20px !important;
    }

    button[kind="primary"]:hover {
        background: #1d4ed8 !important;
        box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12) !important;
    }

    button[kind="secondary"] {
        background: var(--white) !important;
        color: var(--primary-blue) !important;
        border: 1.5px solid var(--primary-blue) !important;
    }

    button[kind="secondary"]:hover {
        background: var(--light-bg) !important;
    }

    /* Inputs - Minimal, Clear */
    input, select, textarea {
        border: 1px solid var(--border) !important;
        border-radius: 8px !important;
        background: var(--white) !important;
        color: var(--text-primary) !important;
        padding: 10px 12px !important;
        transition: all 0.15s ease !important;
        font-size: 0.95rem !important;
    }

    input::placeholder {
        color: var(--text-muted) !important;
    }

    input:focus, select:focus, textarea:focus {
        border-color: var(--primary-blue) !important;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1) !important;
        outline: none !important;
    }

    /* Badges - Soft, Integrated */
    .badge {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 500;
        background: var(--light-bg);
        color: var(--primary-blue);
        border: 1px solid transparent;
    }

    /* Navbar - Lightweight, Clean */
    .navbar-container {
        position: sticky;
        top: 0;
        z-index: 999;
        background: var(--white);
        border-bottom: 1px solid var(--border);
        padding: 1rem 2rem;
    }

    .navbar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1280px;
        margin: 0 auto;
        gap: 2rem;
    }

    .navbar-brand {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primary-blue);
        white-space: nowrap;
        letter-spacing: -0.02em;
    }

    .tab-switcher {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
        flex: 1;
    }

    .tab-btn {
        padding: 0.65rem 1.25rem;
        border: none;
        background: transparent;
        color: var(--text-muted);
        font-weight: 500;
        font-size: 0.95rem;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        position: relative;
    }

    .tab-btn:hover {
        color: var(--text-primary);
        background: var(--light-gray);
    }

    .tab-btn.active {
        color: var(--primary-blue);
        background: transparent;
        border-bottom: 2px solid var(--primary-blue);
        border-radius: 0;
    }

    /* Sidebar - Clean & Light */
    [data-testid="stSidebar"] {
        background: var(--light-gray) !important;
    }

    [data-testid="stSidebar"] [data-testid="stElementContainer"] {
        background: var(--light-gray) !important;
    }

    /* Sections - Alternating backgrounds */
    .section-light {
        background: var(--white);
        padding: 2rem;
        border-radius: 0;
    }

    .section-accent {
        background: var(--light-bg);
        padding: 2rem;
        border-radius: 0;
    }

    /* Footer - Minimal */
    .footer {
        border-top: 1px solid var(--border);
        padding: 2rem;
        text-align: center;
        color: var(--text-muted);
        background: var(--white);
        margin-top: 3rem;
        font-size: 0.875rem;
    }

    .footer a {
        color: var(--primary-blue);
        text-decoration: none;
        font-weight: 500;
    }

    .footer a:hover {
        text-decoration: underline;
    }

    /* Animations - Subtle Only */
    @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slide-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .fade-in {
        animation: fade-in 0.3s ease-out;
    }

    .slide-up {
        animation: slide-up 0.3s ease-out;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .navbar-content {
            flex-direction: column;
            gap: 1rem;
            padding: 0.75rem 0;
        }
        
        .tab-switcher {
            width: 100%;
        }

        .tab-btn {
            flex: 1;
            text-align: center;
        }

        h1 { font-size: 1.75rem; }
        h2 { font-size: 1.35rem; }
    }

    /* Divider */
    hr {
        border: none;
        border-top: 1px solid var(--border);
        margin: 2rem 0;
    }
</style>
""", unsafe_allow_html=True)

# =====================================================
# SESSION STATE & INITIALIZATION
# =====================================================
if "selected_tab" not in st.session_state:
    st.session_state.selected_tab = "Jobs"

if "last_search_results" not in st.session_state:
    st.session_state.last_search_results = []

# =====================================================
# GLOBAL NAVBAR (Sticky, Tab Switcher)
# =====================================================
st.markdown('<div class="navbar-container">', unsafe_allow_html=True)

navbar_col1, navbar_col2, navbar_col3 = st.columns([1.5, 3, 1.5])

with navbar_col1:
    st.markdown("""
    <div class="navbar-brand">
        🌍 kansalt
    </div>
    """, unsafe_allow_html=True)

with navbar_col2:
    # Tab buttons in centered section
    col_ed, col_jobs, col_bus = st.columns([1, 1, 1])
    
    with col_ed:
        active_ed = "active" if st.session_state.selected_tab == "Education" else ""
        if st.button("🎓 Education", use_container_width=True, key="tab_education"):
            st.session_state.selected_tab = "Education"
            st.rerun()
    
    with col_jobs:
        active_jobs = "active" if st.session_state.selected_tab == "Jobs" else ""
        if st.button("💼 Jobs", use_container_width=True, key="tab_jobs"):
            st.session_state.selected_tab = "Jobs"
            st.rerun()
    
    with col_bus:
        active_bus = "active" if st.session_state.selected_tab == "Business" else ""
        if st.button("🏢 Business", use_container_width=True, key="tab_business"):
            st.session_state.selected_tab = "Business"
            st.rerun()

with navbar_col3:
    st.markdown("""
    <div style="text-align: right; color: var(--text-muted); font-size: 0.875rem; padding-top: 0.5rem;">
        v1.0 — Live
    </div>
    """, unsafe_allow_html=True)

st.markdown('</div>', unsafe_allow_html=True)
st.markdown("---")

# =====================================================
# TAB CONTENT DISPATCH
# =====================================================
if st.session_state.selected_tab == "Education":
    render_education()
elif st.session_state.selected_tab == "Business":
    render_business()
else:  # Jobs (default)
    render_jobs()

# =====================================================
# GLOBAL FOOTER
# =====================================================
st.markdown("""
<div class="footer">
    <p><strong>kansalt.com</strong> — Find Your Opportunity | Study Abroad | Hire Top Talent</p>
    <p style="margin-top: 0.5rem; font-size: 0.75rem;">
        © 2026 Kansalt Inc. | 
        <a href="#" target="_blank">Privacy</a> | 
        <a href="#" target="_blank">Terms</a> | 
        <a href="#" target="_blank">Contact</a>
    </p>
</div>
""", unsafe_allow_html=True)
