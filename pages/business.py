"""
Kansalt Business Tab - Tech Solutions & Services
For startups, SMEs, and enterprises
"""
import streamlit as st
import sys
import os

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if project_root not in sys.path:
    sys.path.insert(0, project_root)

# =====================================================
# SERVICES DATA
# =====================================================
SERVICES = [
    {
        "category": "Web & App Development",
        "icon": "💻",
        "description": "Custom web and mobile applications built with modern tech stacks. React, Vue, Flutter, Node.js, Python.",
        "features": [
            "Full-stack development",
            "API design & integration",
            "Progressive Web Apps",
            "Mobile app development",
            "UI/UX design",
        ],
        "price_range": "$10K - $100K+",
    },
    {
        "category": "Cloud & DevOps Solutions",
        "icon": "☁️",
        "description": "AWS, GCP, Azure infrastructure, CI/CD pipelines, containerization, and scalable deployment strategies.",
        "features": [
            "AWS/GCP/Azure setup",
            "Docker & Kubernetes",
            "CI/CD pipelines",
            "Infrastructure as Code",
            "Monitoring & logging",
        ],
        "price_range": "$5K - $50K+",
    },
    {
        "category": "AI & Automation",
        "icon": "🤖",
        "description": "Machine learning models, chatbots, data analytics, predictive systems, and intelligent automation.",
        "features": [
            "ML model development",
            "NLP & Computer Vision",
            "Chatbots & conversational AI",
            "Data analytics dashboards",
            "RPA solutions",
        ],
        "price_range": "$15K - $150K+",
    },
    {
        "category": "Startup Tech Consulting",
        "icon": "🚀",
        "description": "End-to-end tech strategy for startups. MVP development, tech stack selection, team scaling.",
        "features": [
            "MVP development",
            "Tech architecture design",
            "Team building & staffing",
            "Fundraising tech due diligence",
            "Growth hacking",
        ],
        "price_range": "$3K - $30K/month",
    },
    {
        "category": "IT Staffing & Hiring",
        "icon": "👥",
        "description": "Access pre-vetted talent pool. Full-time, contract, and freelance developers, designers, and DevOps engineers.",
        "features": [
            "Developer recruitment",
            "Team augmentation",
            "Dedicated development teams",
            "Freelance marketplace",
            "Talent screening & vetting",
        ],
        "price_range": "$2K - $20K/developer/month",
    },
    {
        "category": "Data & Analytics",
        "icon": "📊",
        "description": "Big data solutions, data warehousing, business intelligence, real-time analytics, and reporting.",
        "features": [
            "Data pipeline architecture",
            "BI dashboards",
            "Data warehousing (Snowflake, BigQuery)",
            "Real-time analytics",
            "Data governance",
        ],
        "price_range": "$8K - $80K+",
    },
]

def render():
    """Main render function for Business tab."""
    
    # Header
    st.markdown("<h1>🏢 Business Solutions</h1>", unsafe_allow_html=True)
    st.markdown("<p>Enterprise-grade tech solutions for startups and companies.</p>", unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # =====================================================
    # HERO SECTION - CLEAN
    # =====================================================
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        <div style='padding: 2rem; background: #F5F9FF; border-radius: 12px; border: 1px solid #E2E8F0;'>
            <h4 style='color: #0F172A; margin-bottom: 1rem;'>Why Choose Us</h4>
            <div style='display: flex; flex-direction: column; gap: 0.75rem;'>
                <div style='display: flex; gap: 0.75rem; align-items: start;'>
                    <span style='color: #2563EB; font-weight: bold; flex-shrink: 0;'>✓</span>
                    <span style='color: #475569; font-size: 0.95rem;'>500+ successful projects</span>
                </div>
                <div style='display: flex; gap: 0.75rem; align-items: start;'>
                    <span style='color: #2563EB; font-weight: bold; flex-shrink: 0;'>✓</span>
                    <span style='color: #475569; font-size: 0.95rem;'>15+ years of experience</span>
                </div>
                <div style='display: flex; gap: 0.75rem; align-items: start;'>
                    <span style='color: #2563EB; font-weight: bold; flex-shrink: 0;'>✓</span>
                    <span style='color: #475569; font-size: 0.95rem;'>Agile & transparent process</span>
                </div>
                <div style='display: flex; gap: 0.75rem; align-items: start;'>
                    <span style='color: #2563EB; font-weight: bold; flex-shrink: 0;'>✓</span>
                    <span style='color: #475569; font-size: 0.95rem;'>Post-launch support</span>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div style='padding: 2rem; background: #FFFFFF; border-radius: 12px; border: 1px solid #E2E8F0;'>
            <h4 style='color: #0F172A; margin-bottom: 1rem;'>Our Expertise</h4>
            <p style='color: #64748B; font-size: 0.85rem; margin-bottom: 0.75rem; font-weight: 500; text-transform: uppercase;'>Tech Stack</p>
            <p style='color: #475569; font-size: 0.9rem; line-height: 1.6;'>React • Vue • Node.js • Python • AWS • Kubernetes • Docker</p>
            <p style='color: #64748B; font-size: 0.85rem; margin: 1rem 0 0.75rem 0; font-weight: 500; text-transform: uppercase;'>Industries</p>
            <p style='color: #475569; font-size: 0.9rem; line-height: 1.6;'>FinTech • HealthTech • SaaS • E-commerce • AI/ML</p>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    st.markdown("---")
    st.markdown("<br>", unsafe_allow_html=True)
    
    # =====================================================
    # SERVICES
    # =====================================================
    st.markdown("<h2>Our Services</h2>", unsafe_allow_html=True)
    st.markdown("")
    
    for idx, service in enumerate(SERVICES):
        st.markdown(f"""
        <div style='border: 1px solid #E2E8F0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; background: #FFFFFF;'>
            <div style='display: flex; gap: 1rem; align-items: start;'>
                <div style='font-size: 2rem; flex-shrink: 0;'>{service['icon']}</div>
                <div style='flex: 1;'>
                    <h4 style='color: #0F172A; margin: 0 0 0.5rem 0; font-size: 1.1rem;'>{service["category"]}</h4>
                    <p style='color: #475569; margin: 0 0 1rem 0; font-size: 0.95rem;'>{service["description"]}</p>
                    <div style='display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;'>
        """, unsafe_allow_html=True)
        
        for feature in service["features"]:
            st.markdown(f"<div style='color: #475569; font-size: 0.9rem;'>✓ {feature}</div>", unsafe_allow_html=True)
        
        st.markdown(f"""
                    </div>
                    <p style='color: #2563EB; font-weight: 600; margin: 1rem 0 0 0; font-size: 0.95rem;'>{service["price_range"]}</p>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)
        
        col1, col2 = st.columns([3, 1])
        with col2:
            if st.button("Learn More", use_container_width=True, key=f"service_proposal_{idx}"):
                st.session_state.selected_service = service["category"]
                st.rerun()
        st.markdown("")
    
    # =====================================================
    # PROPOSAL FORM
    # =====================================================
    if "selected_service" in st.session_state and st.session_state.selected_service:
        st.markdown("---")
        st.markdown(f"#### Request Proposal")
        st.markdown(f"Tell us about your **{st.session_state.selected_service}** project.")
        st.markdown("")
        
        col1, col2 = st.columns(2)
        with col1:
            company_name = st.text_input("Company", key="proposal_company")
        with col2:
            contact_name = st.text_input("Your name", key="proposal_name")
        
        col1, col2 = st.columns(2)
        with col1:
            email = st.text_input("Email", key="proposal_email")
        with col2:
            phone = st.text_input("Phone", key="proposal_phone")
        
        budget = st.selectbox(
            "Budget",
            ["$5K - $20K", "$20K - $50K", "$50K - $100K", "$100K+", "To discuss"],
            key="proposal_budget",
        )
        
        timeline = st.selectbox(
            "Timeline",
            ["ASAP", "1-3 months", "3-6 months", "6-12 months", "Flexible"],
            key="proposal_timeline",
        )
        
        project_desc = st.text_area(
            "Project description",
            placeholder="Tell us about your project...",
            height=100,
            key="proposal_desc",
        )
        
        col1, col2, col3 = st.columns([1, 1, 1])
        with col1:
            if st.button("Send Request", use_container_width=True, type="primary"):
                st.success("✅ Thank you! We'll contact you within 24 hours.")
                st.session_state.selected_service = None
                st.rerun()
        with col3:
            if st.button("Close", use_container_width=True):
                st.session_state.selected_service = None
                st.rerun()
        
        st.markdown("")
    
    # =====================================================
    # PROCESS
    # =====================================================
    st.markdown("---")
    st.markdown("<h2>Our Process</h2>", unsafe_allow_html=True)
    st.markdown("")
    
    col1, col2, col3, col4 = st.columns(4)
    
    steps = [
        ("Consultation", "Understand your goals and requirements"),
        ("Proposal", "Timeline, budget, and roadmap"),
        ("Development", "Agile sprints with weekly updates"),
        ("Support", "Maintenance and scaling"),
    ]
    
    for col, (title, desc) in zip([col1, col2, col3, col4], steps):
        with col:
            st.markdown(f"""
            <div style='background: #F5F9FF; padding: 1.5rem; border-radius: 12px; border: 1px solid #E2E8F0; text-align: center;'>
                <h4 style='color: #2563EB; margin-bottom: 0.5rem; font-size: 1rem;'>{title}</h4>
                <p style='color: #64748B; font-size: 0.85rem; margin: 0;'>{desc}</p>
            </div>
            """, unsafe_allow_html=True)
    
    st.markdown("")
    st.markdown("---")
    st.markdown("")
    
    # =====================================================
    # CTA
    # =====================================================
    st.markdown("""
    <div style='background: #FFFFFF; border: 2px solid #E2E8F0; padding: 2rem; border-radius: 12px; text-align: center;'>
        <h3 style='color: #0F172A; margin-bottom: 0.5rem;'>🚀 Ready to Start?</h3>
        <p style='color: #475569; margin: 0.5rem 0 1.5rem 0;'>Let's discuss your tech needs and build something great together.</p>
    </div>
    """, unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1, 1, 1])
    with col2:
        if st.button("Schedule a Call", use_container_width=True, type="primary"):
            st.info("📧 Email us at business@kansalt.com to schedule a call")
    
    st.markdown("")

if __name__ == "__main__":
    render()
