"""
Kunsalt Job Portal Dashboard
Multi-Tab Platform (Education | Jobs | Business)
Beige + White theme, LinkedIn/Indeed style dashboard UI
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
    /* Color Palette - Beige + White (Professional Dashboard) */
    :root {
        --primary-bg: #F7F3EE;
        --sidebar-bg: #EFE8DF;
        --card-bg: #FFFFFF;
        --accent: #8B6F4E;
        --border: #E2D9CC;
        --text-primary: #2B2B2B;
        --text-secondary: #5A5A5A;
        --text-muted: #8A8A8A;
        --success: #22C55E;
        --card-radius: 8px;
        --spacing: 16px;
        --duration: 200ms;
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
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        line-height: 1.6;
    }

    /* Main container padding */
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

    /* Typography - Clean Hierarchy (Dashboard-style) */
    h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
        letter-spacing: -0.01em;
    }

    h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        margin-top: 1rem;
        letter-spacing: 0;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    p {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    /* Spacing - Tight, Professional Density */
    section {
        padding: 1rem 0;
    }

    /* Cards - Dashboard Style, Cyberpunk Dark */
    .card {
        background: var(--card-bg);
        border: 1px solid var(--border);
        border-radius: var(--card-radius);
        padding: 16px;
        transition: all var(--duration) var(--ease);
        box-shadow: 0 0 20px rgba(124, 58, 237, 0.1), inset 0 0 20px rgba(0, 255, 255, 0.05);
    }

    .card:hover {
        border-color: rgba(124, 58, 237, 0.5);
        box-shadow: 0 0 30px rgba(124, 58, 237, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1);
        transform: translateY(-2px);
    }

    /* Buttons - Clean & Clear */
    button {
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.15s ease;
        border: none;
    }

    button[kind="primary"] {
        background: var(--primary-orange) !important;
        color: white !important;
        padding: 12px 24px !important;
        border-radius: 8px !important;
        border: 1px solid var(--primary-orange) !important;
        font-weight: 500 !important;
        transition: all var(--duration) var(--ease) !important;
        cursor: pointer !important;
        text-transform: uppercase;
        font-size: 0.85rem;
        letter-spacing: 0.05em;
    }

    button[kind="primary"]:hover {
        background: var(--primary-purple) !important;
        border-color: var(--primary-purple) !important;
        box-shadow: 0 0 20px rgba(249, 115, 22, 0.5) !important;
        transform: translateY(-2px) scale(1.01) !important;
    }

    button[kind="primary"]:active {
        transform: translateY(0) scale(0.99) !important;
    }

    button[kind="secondary"] {
        background: rgba(0, 255, 255, 0.1) !important;
        color: var(--primary-cyan) !important;
        border: 1px solid var(--primary-cyan) !important;
        font-weight: 500 !important;
        transition: all var(--duration) var(--ease) !important;
        cursor: pointer !important;
    }

    button[kind="secondary"]:hover {
        background: rgba(0, 255, 255, 0.2) !important;
        transform: translateY(-2px) scale(1.01) !important;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.4) !important;
    }

    button[kind="secondary"]:active {
        transform: translateY(0) scale(0.99) !important;
    }

    /* Inputs - Minimal, Clear */
    input, select, textarea {
        border: 1px solid var(--border) !important;
        border-radius: 6px !important;
        background: rgba(229, 231, 235, 0.05) !important;
        color: var(--text-primary) !important;
        padding: 10px 12px !important;
        transition: all 0.15s ease !important;
        font-size: 0.9rem !important;
    }

    input::placeholder {
        color: var(--text-muted) !important;
    }

    input:focus, select:focus, textarea:focus {
        border-color: var(--primary-cyan) !important;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.3) !important;
        outline: none !important;
        background: rgba(0, 255, 255, 0.05) !important;
    }

    /* Badges - Neon, Integrated */
    .badge {
        display: inline-block;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 600;
        background: rgba(249, 115, 22, 0.15);
        color: var(--primary-orange);
        border: 1px solid rgba(249, 115, 22, 0.3);
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    /* Navbar - Lightweight, Cyberpunk */
    .navbar-container {
        position: sticky;
        top: 0;
        z-index: 999;
        background: rgba(15, 5, 26, 0.9);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(0, 255, 255, 0.2);
        padding: 1rem 2rem;
        box-shadow: 0 0 30px rgba(0, 255, 255, 0.1);
    }

    .navbar-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 1400px;
        margin: 0 auto;
        gap: 1.5rem;
        padding: 0 2rem;
    }
    }

    .navbar-brand {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primary-orange);
        white-space: nowrap;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-shadow: 0 0 10px rgba(249, 115, 22, 0.5);
    }

    .tab-switcher {
        display: flex;
        gap: 0.25rem;
        justify-content: center;
        flex: 1;
    }

    .tab-btn {
        padding: 0.5rem 1rem;
        border: none;
        background: transparent;
        color: var(--text-muted);
        font-weight: 500;
        font-size: 0.85rem;
        border-radius: 0;
        cursor: pointer;
        transition: all var(--duration) var(--ease);
        position: relative;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .tab-btn:hover {
        color: var(--primary-cyan);
        background: transparent;
    }

    .tab-btn.active {
        color: var(--primary-orange);
        background: transparent;
        border-bottom: 2px solid var(--primary-orange);
        border-radius: 0;
        font-weight: 600;
        box-shadow: 0 -2px 15px rgba(249, 115, 22, 0.3);
    }

    /* Sidebar - Clean & Light */
    [data-testid="stSidebar"] {
        background: var(--secondary-bg) !important;
    }

    [data-testid="stSidebar"] [data-testid="stElementContainer"] {
        background: var(--secondary-bg) !important;
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

    /* Footer - Cyberpunk Minimal */
    .footer {
        border-top: 1px solid rgba(0, 255, 255, 0.2);
        padding: 2rem;
        text-align: center;
        color: var(--text-muted);
        background: rgba(15, 5, 26, 0.8);
        margin-top: 3rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .footer a {
        color: var(--primary-orange);
        text-decoration: none;
        font-weight: 500;
    }

    .footer a:hover {
        color: var(--primary-cyan);
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
    st.session_state.selected_tab = "Home"

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
    # Tab buttons in centered section (Home + three main tabs)
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
if st.session_state.selected_tab == "Home":
    render_home()
elif st.session_state.selected_tab == "Education":
    render_education()
elif st.session_state.selected_tab == "Business":
    render_business()
else:  # Jobs
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
