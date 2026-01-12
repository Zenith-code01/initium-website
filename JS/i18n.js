/* =========================
   IM i18n (Full Site + About Us (au-*) + Company Snapshot + Investors v2 + Products + Contact)
   - Two-way switch (EN <-> ZH)
   - EN fallback to prevent "stuck in Chinese"
   - Robust dropdown creation (works on any page)
   - Supports: textContent + placeholder (data-i18n-ph / data-i18n-placeholder)
   - Company Snapshot copy buttons support (safe if absent)
   ========================= */

// =========================
// DICTIONARY
// =========================
const translations = {
  en: {
    // NAV
    nav_about: "About Us",
    nav_investors: "Investors",
    nav_products: "Products",
    nav_contact: "Contact Us",
    nav_login: "Log in",

    // HERO (carousel text)
    hero_kicker_1: "OVERVIEW",
    hero_title_1:
      "IM Capital delivers professional investment solutions across Commercial Property, Property Development and Private Credit, enabling investors to access stable, asset-backed opportunities in prime locations throughout Australia.",
    hero_kicker_2: "INVESTORS",
    hero_title_2:
      "We challenge ourselves in developing investment products and services catering to the evolving needs of investors in a competitive market.",
    hero_kicker_3: "PRIVATE CREDIT",
    hero_title_3:
      "Short-duration, asset-backed opportunities supported by robust underwriting, security structure and risk controls.",

    // STATS
    stat_label_1: "Investor Target Return",
    stat_label_2: "Deal Size Focus",
    stat_label_3: "Months Duration",
    stat_label_4: "Minimum Investment",
    stat_label_5: "Investor Distributions",

    // PCF HERO
    pcf_eyebrow: "IM Private Credit Fund",
    pcf_hero_title:
      "The IM Private Credit Fund has built a strong track record, delivering consistent investor returns over time.",
    pcf_hero_sub:
      "The fund reflects a disciplined credit strategy and a focus on high-quality, secured lending opportunities.",

    // CARDS
    card_philosophy_title: "Our Philosophy",
    card_philosophy_p1:
      "At IM Capital, understanding and achieving our clients’ goals are at the core of our company values. Our philosophy has always been to back our beliefs with actions.",
    card_philosophy_p2:
      "We spent a year personally testing and investing in the market to ensure zero losses or zero-interest investments. Our primary focus is on single-asset lending, with the ultimate goal of transitioning to a pooled fund structure.",
    card_philosophy_p3:
      "We remain steadfast in this commitment, recognizing the importance of aligning our interests with those of our clients in the commercial real estate debt market.",

    card_background_title: "Background & Expertise",
    card_background_p1:
      "Before the official launch of the IM Capital Private Credit Fund, we conducted a thorough internal review with the board. Our philosophy has always been to back our words with actions.",
    card_background_p2:
      "IM adopts a dual-pronged approach to transaction assessment. First, our credit team conducts an evaluation, followed by a review by IM Management’s in-house real estate experts.",
    card_background_p3:
      "As a wholly owned subsidiary of IM Group, IM Management has a strong reputation in real estate development, providing significant advantages for IM and its investors.",

    // HIGHLIGHT
    highlight_title: "Single Asset Investment",
    highlight_p:
      "Our single-asset investments allow investors and their advisors to select opportunities based on their risk and return preferences. Investors can set their own risk parameters and focus on any preferred sub-asset class, geographic region, or investment term.",

    // DETAIL – REAL ESTATE
    detail_title_1: "Real Estate Asset Focus",
    detail_intro_1:
      "We arrange loans secured by the following types of real estate assets:",
    detail_asset_1:
      "Major metropolitan areas, with a focus on key cities such as Sydney, Melbourne, and Brisbane.",
    detail_asset_2:
      "Secured property values typically range from $5 million to $50 million, with relatively strong liquidity for both acquisitions and refinancing.",
    detail_asset_3:
      "Non-specialized real estate assets, including residential land, completed apartments, general commercial properties, and construction loans.",

    // DETAIL – UNDERWRITING
    detail_title_2: "Underwriting Metrics",
    detail_intro_2:
      "As part of the credit assessment process, IM Capital considers key underwriting metrics, including:",
    detail_metric_1: "Location and site amenities",
    detail_metric_2:
      "Land acquisition value and terms, relative to independent professional valuations",
    detail_metric_3:
      "Conditions precedent, ongoing covenants, and conditions subsequent",
    detail_metric_4: "Security structure",
    detail_metric_5: "LVR/LTC ratios",
    detail_metric_6:
      "Borrower’s income, other net assets, and repayment history",

    // FOOTER TOP
    footer_top_eyebrow: "FOR INVESTORS",
    footer_top_title: "Institutional-grade, asset-backed opportunities.",
    footer_top_sub:
      "Private credit strategies supported by disciplined underwriting, clear security structure, and risk controls.",
    footer_btn_request: "Request Information",
    footer_btn_login: "Investor Login",

    // FOOTER MAIN
    footer_brand_line:
      "Australian investment manager focused on private credit and real asset strategies.",
    footer_col_strategies: "Strategies",
    footer_col_resources: "Investor Resources",
    footer_col_contact: "Contact",

    footer_badge_asset_backed: "Asset-backed",
    footer_badge_short_duration: "Short-duration",
    footer_badge_risk_disciplined: "Risk-disciplined",


    footer_link_private_credit: "Private Credit",
    footer_link_commercial: "Commercial Property",
    footer_link_development: "Development Finance",
    footer_link_portfolio: "Portfolio Overview",

    // FOOTER LEGAL
    footer_legal_terms: "Website Terms",
    footer_legal_privacy: "Privacy",
    footer_legal_disclaimer: "Disclaimer",

    contact_city_1: "Sydney",
    contact_city_2: "Melbourne",
    contact_phone: "Phone",

    about_cta_note: "General information only. Not an offer or recommendation.",

    // CONTACT US (cu_*)
    cu_kicker: "CONTACT",
    cu_title: "Get in touch with IM Capital",
    cu_sub: "Reach out for investor enquiries, partnership opportunities, or general questions.",
    cu_info_title: "Contact details",
    cu_info_desc: "We aim to respond within 1–2 business days.",
    cu_addr_label: "Office",
    cu_addr_value: "Sydney, NSW, Australia",
    cu_email_label: "Email",
    cu_email_value: "info@initiumcapital.com.au",
    cu_phone_label: "Phone",
    cu_phone_value: "+61 2 8372 2404",
    cu_hours_label: "Hours",
    cu_hours_value: "Mon – Fri, 9:00am–5:00pm (AEST/AEDT)",
    cu_investor_title: "Investor enquiries",
    cu_investor_text:
      "Please include your expected investment amount and time horizon so we can route your message.",
    cu_form_title: "Send a message",
    cu_form_desc: "Use the form below and we’ll get back to you as soon as possible.",
    cu_name: "Full name",
    cu_name_ph: "e.g., Alex Chen",
    cu_email: "Email",
    cu_email_ph: "e.g., alex@email.com",
    cu_subject: "Subject",
    cu_subject_ph: "Investor enquiry / Partnership / General",
    cu_message: "Message",
    cu_message_ph: "Tell us what you need and any helpful context…",
    cu_submit: "Submit",
    cu_note:
      "By submitting, you agree that your information may be used to respond to your enquiry.",
    cu_toast: "Thanks — your message has been prepared for submission.",
    cu_disclaimer:
      "Disclaimer: The information on this website is general in nature and does not constitute financial advice. Any investment involves risk. Please consider your objectives and seek professional advice where appropriate.",

    // Footer resource links
    how_it_works: "How it works",
    documents: "Fund Documents",
    distributions: "Distributions",
    contact: "Speak with the team",

    // COMPANY SNAPSHOT (cs_*)
    cs_kicker: "COMPANY OVERVIEW",
    cs_title: "IM Capital — Company Snapshot",
    cs_sub:
      "Founded in 2021 by two family offices and partners with deep expertise across commercial real estate, asset management and private banking. We focus on institutional-grade, asset-backed opportunities for UHNW clients and family offices.",

    cs_snap_title: "Company Snapshot",

    cs_label_founded: "Founded",
    cs_founded: "2021",

    cs_founders_label: "Founded by",
    cs_founders_value: "Huang Family Office · Hayson Family Office · Bo Zhuang",

    cs_positioning_label: "Positioning",
    cs_positioning_value:
      "One-stop financial services for UHNW clients and family offices.",

    cs_focus_label: "Focus",
    cs_focus_value:
      "Commercial property investment, property development and private credit strategies.",

    cs_label_apir_entity: "APIR (Entity)",
    cs_label_apir_product: "APIR (Commercial Property Fund)",
    cs_copy_btn: "Copy",
    cs_copied_btn: "Copied",

    cs_disclaimer:
      "APIR codes are for product identification only and do not constitute an offer or recommendation.",

    cs_funds_title: "Our Funds",
    cs_pill_core: "Core",
    cs_fund_1: "IM Commercial Property Fund",
    cs_fund_1_sub:
      "Prime retail & commercial assets in Sydney’s tier-one locations, supported by active asset management.",

    cs_pill_dev: "Development",
    cs_fund_2: "IM Mosman Development Fund",
    cs_fund_2_sub:
      "Project-focused strategy seeking value creation through disciplined planning and execution.",

    cs_pill_credit: "Private Credit",
    cs_fund_3: "IM Private Credit Fund",
    cs_fund_3_sub:
      "Short-duration, asset-backed lending opportunities with robust underwriting and risk controls.",

    cs_platforms_title: "Platforms & Research",
    cs_platforms_note:
      "Availability across leading Australian platforms improves accessibility, reporting transparency and investor experience.",

    cs_rating_title: "Research & Rating",
    cs_rating_note:
      "Supported by independent research coverage, reinforcing our commitment to robust investment governance.",

    cs_services_title: "Services",
    cs_service_1: "Fund investment management",
    cs_service_2: "Private wealth management",
    cs_service_3: "Property advisory & management",
    cs_service_4: "Lending solutions",
    cs_service_5: "Family office setup & advisory",

    cs_acc_team: "Leadership & Team",
    cs_acc_heritage: "Family Office Heritage",
    cs_acc_community: "Community & Sponsorship",

    cs_role_founder: "Founding Partner",
    cs_role_bd: "Business Director",
    cs_role_director: "Director",
    cs_role_assistant: "Assistant Manager",

    cs_victor_bio:
      "CEO of Huang Family Office. Focused on IM brand development and family office value legacy, with extensive experience in local and international property investment and development.",
    cs_max_bio:
      "Deep expertise across commercial real estate acquisition, leasing, development planning, construction project management and asset operations, supported by a long-standing family office heritage.",
    cs_bo_bio:
      "15+ years in private banking, wealth management and fund management. Senior private banking background across APAC and Australia/New Zealand. RG146 certified.",
    cs_mark_bio:
      "15+ years in business development, wealth and fund management. Former Westpac and Citibank relationship manager. Joined IM in 2023. RG146.",
    cs_stanley_bio:
      "Extensive banking experience (Westpac Private, St George, ANZ). Leads operational support, risk management and coordination. Joined in 2022. RG146.",
    cs_will_bio:
      "Leads lending advisory. Background in investment management, credit consulting and financial analysis. Managed 200+ tenant/client relationships. Holds multiple finance and mortgage qualifications.",
    cs_libin_bio:
      "Supports distribution and stakeholder relationship management. Joined IM in 2023. Holds a Master’s degree in Management and Finance (UTS).",

    cs_heritage_p1:
      "The Hayson family has a long-standing track record in landmark retail and mixed-use developments. Signature projects include Harbourside (Darling Harbour) and Pitt Street Mall’s Skygarden.",

    cs_heritage_li_1: "Skygarden — Pitt St Mall",
    cs_heritage_li_2: "Manly Wharf retail development",
    cs_heritage_li_3: "Kogarah Town Shopping Centre",
    cs_heritage_li_4: "Metropole Shopping Centre (Cremorne)",
    cs_heritage_li_5: "Southpoint Shopping Centre (Hillsdale)",

    cs_csr_1:
      "Proud supporter and sponsor of Starlight Five Chefs Dinner — a signature fundraising experience supporting children and families.",
    cs_csr_2:
      "Major sponsor of Heritage Classic Pro-Am, supporting children and families requiring specialised care and support.",

    // ABOUT US (about_*)
    about_eyebrow: "ABOUT IM CAPITAL",
    about_title:
      "Institutional-grade private credit and real asset strategies, built on disciplined underwriting.",
    about_sub:
      "IM Capital is an Australian investment manager focused on asset-backed opportunities across private credit, commercial property and development-related strategies—designed for UHNW clients and family offices.",

    about_badge_1_top: "Asset-backed",
    about_badge_1_btm: "Clear security & borrower alignment",
    about_badge_2_top: "Risk disciplined",
    about_badge_2_btm: "Structured underwriting & controls",
    about_badge_3_top: "Short duration",
    about_badge_3_btm: "Designed for liquidity & resilience",

    about_glance: "AT A GLANCE",
    about_kpi_1: "Founded",
    about_kpi_2: "Headquartered",
    about_kpi_3: "Core strategy",
    about_kpi_4: "Security-first",
    about_kpi_5_num: "Institutional process",
    about_kpi_5_lab: "Credit + real estate review, governance-led decisioning",
    about_note:
      "Information on this page is general in nature and is not an offer or recommendation.",

    about_who_kicker: "WHO WE ARE",
    about_who_title: "A specialist team built around credit discipline",
    about_who_p:
      "We focus on secured, real-asset-aligned opportunities where structure matters. Our process emphasises downside protection, clarity of security, and pragmatic exit thinking—so investors can access stable, asset-backed opportunities in prime locations.",
    about_who_c1_title: "Security-first",
    about_who_c1_p:
      "We prioritise robust security structure and clear borrower alignment across transactions.",
    about_who_c2_title: "Underwriting-led",
    about_who_c2_p:
      "Investment decisions are driven by disciplined credit assessment, covenants, and scenario-based downside review.",
    about_who_c3_title: "Designed for investors",
    about_who_c3_p:
      "We focus on transparency, reporting expectations, and investor experience suitable for UHNW clients and family offices.",

    about_how_kicker: "HOW WE INVEST",
    about_how_title: "A repeatable framework across real assets",
    about_how_p:
      "Our approach combines credit underwriting with real estate expertise. We evaluate structure, collateral quality, borrower profile, and exit pathways—aiming to maintain resilience across cycles.",

    about_pillar_1_tag: "Pillar 01",
    about_pillar_1_title: "Select assets & locations",
    about_pillar_1_p:
      "Focus on prime metropolitan markets, liquidity-aware collateral, and practical valuation assumptions.",
    about_pillar_1_li1: "Prime city locations and established demand drivers",
    about_pillar_1_li2: "Independent valuation, conservative downside lens",
    about_pillar_1_li3: "Exit clarity: refinance, sale, or planned repayment",

    about_pillar_2_tag: "Pillar 02",
    about_pillar_2_title: "Structure for protection",
    about_pillar_2_p:
      "Security structure, covenants, and documentation are designed to protect downside and enforce discipline.",
    about_pillar_2_li1: "Clear security package and enforceable covenants",
    about_pillar_2_li2:
      "Conditions precedent / subsequent and ongoing monitoring",
    about_pillar_2_li3: "Defined reporting expectations and governance checks",

    about_pillar_3_tag: "Pillar 03",
    about_pillar_3_title: "Underwrite the borrower",
    about_pillar_3_p:
      "We assess capacity, history, incentives, and repayment pathways—not just the asset.",
    about_pillar_3_li1: "Income, other net assets, and repayment history",
    about_pillar_3_li2: "Sponsor alignment and track record review",
    about_pillar_3_li3: "Conservative assumptions and contingency planning",

    about_risk_c1_cap: "CREDIT REVIEW",
    about_risk_c1_text:
      "Transaction assessment led by credit evaluation, covenants, and scenario testing.",
    about_risk_c2_cap: "REAL ESTATE REVIEW",
    about_risk_c2_text:
      "Independent valuation lens, location quality, and asset marketability review.",
    about_risk_c3_cap: "ONGOING MONITORING",
    about_risk_c3_text:
      "Reporting expectations, milestone controls, and structure-driven risk checks.",

    about_team_kicker: "LEADERSHIP",
    about_team_title:
      "Experience across private banking, real estate and investments",
    about_team_p:
      "Our leadership combines credit discipline and real asset expertise, supported by institutional governance and investor-first delivery.",

    about_platforms_kicker: "PLATFORMS",
    about_platforms_title: "Accessibility across leading platforms",
    about_platforms_p:
      "Availability across major Australian platforms supports accessibility, reporting transparency and investor experience.",
    about_presence_kicker: "PRESENCE",
    about_presence_title: "Sydney & Melbourne",
    about_presence_p:
      "We operate across Australia’s key markets with a focus on prime metropolitan locations.",
    about_loc_1: "Sydney",
    about_loc_2: "Melbourne",

    about_csr_kicker: "COMMUNITY",
    about_csr_title: "Committed to community partnerships",
    about_csr_p:
      "We support initiatives that deliver meaningful outcomes for children and families through long-term partnerships.",
    about_csr_1:
      "Proud supporter and sponsor of signature fundraising experiences supporting children and families.",
    about_csr_2:
      "Major sponsor supporting children and families requiring specialised care and support.",

    about_cta_kicker: "NEXT STEP",
    about_cta_title: "Explore our investment strategies",
    about_cta_p:
      "Learn how our private credit and real asset strategies are structured for clarity, discipline and investor alignment.",
    about_cta_btn_1: "View Products",
    about_cta_btn_2: "Contact Us",

    about_process_kicker: "PROCESS",
    about_process_title: "From sourcing to monitoring—built for consistency",
    about_process_p:
      "A clear workflow helps reduce ambiguity: define the structure, validate collateral, underwrite the borrower, document the deal, and monitor milestones through to repayment.",
    about_process_s1_t: "Screen & structure",
    about_process_s1_p:
      "Initial screening, indicative terms, and alignment on security and repayment pathway.",
    about_process_s2_t: "Diligence & underwriting",
    about_process_s2_p:
      "Collateral review, borrower assessment, downside scenarios, and covenant design.",
    about_process_s3_t: "Documentation",
    about_process_s3_p:
      "Clear legal framework, conditions precedent/subsequent, and enforceable security package.",
    about_process_s4_t: "Monitor & manage",
    about_process_s4_p:
      "Ongoing reporting expectations, milestone controls, and early risk indicators.",

    about_faq_kicker: "FAQ",
    about_faq_title: "Common questions",
    about_faq_p:
      "High-level information only. For detailed documents, please contact us.",
    about_faq_q1: "What does “asset-backed” mean in your context?",
    about_faq_a1:
      "It generally refers to investment exposures supported by identifiable collateral and documented security arrangements.",
    about_faq_q2: "How do you manage downside risk?",
    about_faq_a2:
      "Through underwriting, conservative assumptions, covenant structure, documentation, and ongoing monitoring.",
    about_faq_q3: "Where are you based?",
    about_faq_a3:
      "We operate across Sydney and Melbourne and focus on key metropolitan markets.",

    // =========================
    // PRODUCTS PAGE (prd_*)
    // =========================
    prd_kicker: "Our Philosophy",
    prd_title: "Private Credit Strategies Backed by Real Assets",
    prd_sub:
      "At IM Capital, understanding and achieving our clients’ goals are at the core of our company values. Our philosophy has always been to back our beliefs with actions.We spent a year personally testing and investing in the market to ensure zero losses or zero-interest investments. Our primary focus is on single-asset lending, with the ultimate goal of transitioning to a pooled fund structure.We remain steadfast in this commitment, recognizing the importance of aligning our interests with those of our clients in the commercial real estate debt market.",
    prd_badge_1: "Senior Secured",
    prd_badge_2: "Real Asset Backed",
    prd_badge_3: "Short Duration",
    prd_badge_4: "Australia Focus",
    prd_cta_primary: "Request Information",
    prd_cta_secondary: "Explore Strategies",
    prd_disclaimer:
      "This page is for general information only and does not constitute financial product advice.",

    prd_metric_1_num: "3 – 24 Months",
    prd_metric_1_lbl: "Duration",
    prd_metric_2_num: "5m – 50m",
    prd_metric_2_lbl: "Deal Size Focus",
    prd_metric_3_num: "Monthly",
    prd_metric_3_lbl: "Investor Distributions",
    prd_metric_4_num: "A$250,000",
    prd_metric_4_lbl: "Minimum Investment",
    prd_metric_5_num: "10-16% P.A.",
    prd_metric_5_lbl: "Investor Target Return",

    prd_core_kicker: "PRODUCT",
    prd_core_title: "First Mortgage Products",
    prd_core_sub:
      "Illustrative first mortgage opportunities structured for income stability, clear security, and disciplined underwriting.",

    prd_p1_title: "Point Piper, Sydney NSW",
    prd_p1_s1_k: "Target return",
    prd_p1_s1_v: "10% p.a.*",
    prd_p1_s2_k: "Security",
    prd_p1_s2_v: "First Mortgage",
    prd_p1_s3_k: "LVR focus",
    prd_p1_s3_v: "65%",
    prd_p1_s4_k: "Tenor",
    prd_p1_s4_v: "12 months",
    prd_p1_s5_k: "Distribution",
    prd_p1_s5_v: "Monthly",
    prd_p1_copy:
      "Refinance of a first mortgage previously held by another private lender for the asset in Point Piper, Sydney NSW.",

    prd_p2_title: "East Lindfield, NSW",
    prd_p2_s1_k: "Target return",
    prd_p2_s1_v: "10% p.a.*",
    prd_p2_s2_k: "Security",
    prd_p2_s2_v: "First Mortgage",
    prd_p2_s3_k: "LVR focus",
    prd_p2_s3_v: "80%",
    prd_p2_s4_k: "Tenor",
    prd_p2_s4_v: "6 months",
    prd_p2_s5_k: "Distribution",
    prd_p2_s5_v: "Monthly",
    prd_p2_copy:
      "First mortgage facility to refinance an existing facility.",

    prd_p3_title: "Bardwell Park, Sydney NSW",
    prd_p3_s1_k: "Target return",
    prd_p3_s1_v: "10% p.a.*",
    prd_p3_s2_k: "Security",
    prd_p3_s2_v: "First Mortgage",
    prd_p3_s3_k: "LVR focus",
    prd_p3_s3_v: "82.5%",
    prd_p3_s4_k: "Tenor",
    prd_p3_s4_v: "7 months",
    prd_p3_s5_k: "Asset summary",
    prd_p3_s5_v:
      "Refinance + equity release of a double-brick 6-bed, 4-bath home on 771sqm, with pool and golf course views.",
    prd_p3_copy:
      "First mortgage refinance and equity release facility for a residential asset in Bardwell Park, Sydney NSW.",

    prd_p_more: "Request details",
    prd_return_note:
      "*Target returns are indicative only and not guaranteed. Past performance is not a reliable indicator of future performance.",

    prd_why_kicker: "INVESTMENT PHILOSOPHY",
    prd_why_title: "Built for downside protection",
    prd_why_sub:
      "We focus on structure, collateral quality, and exit planning—before considering yield.",
    prd_why_1_title: "Asset-backed security",
    prd_why_1_copy:
      "Every strategy is anchored by tangible collateral and enforceable security.",
    prd_why_2_title: "Short-duration focus",
    prd_why_2_copy:
      "Shorter tenors can reduce macro cycle exposure and improve liquidity planning.",
    prd_why_3_title: "Disciplined underwriting",
    prd_why_3_copy:
      "Conservative LVR, third-party valuations, and stress-tested exit scenarios.",

    prd_risk_kicker: "RISK & PROTECTION",
    prd_risk_title: "Risk controls embedded in the structure",
    prd_risk_sub:
      "Our process is designed to identify downside early and protect capital through rigorous controls.",
    prd_r1: "Conservative LVR thresholds and borrower equity alignment",
    prd_r2: "Independent valuations and legal due diligence",
    prd_r3: "Seniority and security documentation tailored to the asset",
    prd_r4: "Active monitoring, reporting, and exit planning",
    prd_r5: "Structured covenants where appropriate",

    prd_cta_title: "Receive the investment overview",
    prd_cta_sub:
      "Connect with our team to request product information and discuss suitability.",
    prd_cta_btn_1: "Contact Us",
    prd_cta_btn_2: "Learn about IM",

    // INVESTORS v2 (inv2_*)
    inv2_pill: "Investor Access • Private Credit • Real Assets",
    inv2_h1_pre: "Earn",
    inv2_h1_accent: "stable income",
    inv2_h1_mid: "backed by",
    inv2_h1_ink: "real assets",
    inv2_lead:
      "IM Capital structures senior-secured private credit opportunities with disciplined underwriting, clear exits, and capital preservation at the core.",
    inv2_btn_pack: "Request Investor Pack",
    inv2_btn_overview: "View Strategy Overview",
    inv2_badge_qualified: "Wholesale / Sophisticated Investors",
    inv2_disclaimer_short: "Information only • Not financial advice",
    inv2_chip_lens: "Portfolio Lens",
    inv2_chip_senior: "Senior Secured",
    inv2_chip_income: "Income",
    inv2_kpi_1_label: "Target Net Return",
    inv2_kpi_2_label: "Typical Tenor",
    inv2_kpi_3_label: "Security",
    inv2_kpi_3_value: "1st Mortgage",
    inv2_kpi_4_label: "Downside Focus",
    inv2_kpi_4_value: "Conservative LVRs",
    inv2_chart_title: "Income Profile (Illustrative)",
    inv2_chart_note:
      "Illustrative only • Past performance is not indicative of future results.",
    inv2_ticker_1: "Senior-secured structures",
    inv2_ticker_2: "Clear exit pathways",
    inv2_ticker_3: "Independent valuations",
    inv2_ticker_4: "Active monitoring",
    inv2_ticker_5: "Asset-backed protection",
    inv2_ticker_6: "Short duration focus",
    inv2_trust_1_t: "Underwriting Discipline",
    inv2_trust_1_p: "Diligence-led assessment with conservative structuring.",
    inv2_trust_2_t: "Security & Documentation",
    inv2_trust_2_p: "Senior ranking, robust legal protections and covenants.",
    inv2_trust_3_t: "Monitoring & Exits",
    inv2_trust_3_p: "Active oversight with defined repayment pathways.",
    inv2_edge_title: "Why investors choose private credit",
    inv2_edge_sub:
      "Designed for income resilience and structural protection, especially when public markets are volatile.",
    inv2_edge_tag_1: "Income",
    inv2_edge_1_t: "Consistent yield profile",
    inv2_edge_1_p:
      "Cashflow-oriented structure with defined terms and repayment sources.",
    inv2_edge_tag_2: "Protection",
    inv2_edge_2_t: "Senior-secured downside focus",
    inv2_edge_2_p:
      "Priority ranking + asset-backed security designed to protect capital.",
    inv2_edge_tag_3: "Duration",
    inv2_edge_3_t: "Shorter duration flexibility",
    inv2_edge_3_p:
      "Shorter tenors reduce rate sensitivity and improve portfolio agility.",
    inv2_strategy_title: "Strategy set",
    inv2_strategy_sub:
      "Simple, readable, investor-style positioning — not marketing copy.",
    inv2_strategy_badge_1: "Core",
    inv2_strategy_1_t: "Senior Secured Property Lending",
    inv2_strategy_1_li1: "1st mortgage security",
    inv2_strategy_1_li2: "Conservative leverage with valuation discipline",
    inv2_strategy_1_li3: "Defined exit plans and monitoring cadence",
    inv2_strategy_1_link: "See risk controls →",
    inv2_strategy_badge_2: "Opportunistic",
    inv2_strategy_2_t: "Bridging & Special Situations",
    inv2_strategy_2_li1: "Time-sensitive opportunities with clear catalysts",
    inv2_strategy_2_li2: "Enhanced premium aligned to structure",
    inv2_strategy_2_li3: "Strict documentation and fallback exits",
    inv2_strategy_2_link: "View illustrative examples →",
    inv2_process_title: "Risk framework",
    inv2_process_sub: "What investors care about: the repeatable process.",
    inv2_step_1_t: "Origination & Screening",
    inv2_step_1_p:
      "Initial filtering based on structure, asset quality, and exit credibility.",
    inv2_step_2_t: "Valuation & Legal Diligence",
    inv2_step_2_p:
      "Independent valuation, title checks, and enforceable security documentation.",
    inv2_step_3_t: "Structuring & Covenants",
    inv2_step_3_p: "LVR discipline, covenants, and investor-aligned protections.",
    inv2_step_4_t: "Monitoring & Exit",
    inv2_step_4_p:
      "Active oversight, milestones tracking, and predefined exit pathways.",
    inv2_final_title: "Get the Investor Pack",
    inv2_final_sub:
      "Receive strategy summary, risk framework, and illustrative deal snapshots.",
    inv2_final_btn_1: "Request Pack",
    inv2_final_btn_2: "Book a Call",
    inv2_form_title: "Quick request",
    inv2_form_name_ph: "Full name",
    inv2_form_email_ph: "Email",
    inv2_form_submit: "Send",
    inv2_form_note: "We’ll respond within 1 business day.",

    // LEGAL mini footer
    legal_mini: "General information only. Not financial advice. Please read our Disclaimer and Privacy Policy.",
    legal_disclaimer_link: "Disclaimer",
    legal_privacy_link: "Privacy Policy",

    // Legal shared
    legal_kicker: "LEGAL",
    legal_updated: "Last updated: 2026-01-05",

    // Disclaimer page
    disclaimer_title_tag: "Disclaimer | IM Capital",
    disclaimer_h1: "Disclaimer",
    disclaimer_sub: "Important information about the content on this website.",
    disclaimer_h2_1: "General information only",
    disclaimer_p_1: "not constitute financial product advice, legal advice, tax advice, or an offer or solicitation to invest.",
    disclaimer_h2_2: "No reliance",
    disclaimer_p_2: "You should not rely on the information on this website to make investment decisions. You should obtain independent professional advice and consider your personal objectives, financial situation, and needs.",
    disclaimer_h2_3: "Forward-looking statements",
    disclaimer_p_3: "Any forward-looking statements are subject to risks and uncertainties. Actual outcomes may differ materially from those expressed or implied.",
    disclaimer_h2_4: "Performance and risk",
    disclaimer_p_4: "Past performance is not a reliable indicator of future performance. Investments carry risk, including possible loss of capital.",
    disclaimer_h2_5: "Third-party links",
    disclaimer_p_5: "This website may contain links to third-party sites. We do not control and are not responsible for the content, accuracy, or security of those websites.",
    disclaimer_h2_6: "Contact",
    disclaimer_p_6: "If you have questions about this Disclaimer, please contact us via the Contact Us page.",

    // Privacy page
    privacy_title_tag: "Privacy Policy | IM Capital",
    privacy_h1: "Privacy Policy",
    privacy_sub: "How we collect, use, and protect your personal information.",
    privacy_h2_1: "Information we collect",
    privacy_p_1: "We may collect personal information you provide when you contact us, such as your name, email address, organisation, and enquiry details.",
    privacy_h2_2: "How we use information",
    privacy_p_2: "We use your information to respond to enquiries, provide requested information, improve our services, and meet legal or regulatory obligations.",
    privacy_h2_3: "Disclosure",
    privacy_p_3: "We may share information with service providers who assist us in operating the website and responding to enquiries, subject to confidentiality and security obligations.",
    privacy_h2_4: "Security",
    privacy_p_4: "We take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access or disclosure.",
    privacy_h2_5: "Cookies and analytics",
    privacy_p_5: "We may use cookies and analytics tools to understand website usage and improve user experience. You can control cookies through your browser settings.",
    privacy_h2_6: "Access and correction",
    privacy_p_6: "You may request access to or correction of your personal information by contacting us."

  },

  zh: {
    // NAV
    nav_about: "关于我们",
    nav_investors: "投资人",
    nav_products: "产品",
    nav_contact: "联系我们",
    nav_login: "登录",

    // HERO
    hero_kicker_1: "概览",
    hero_title_1:
      "IM Capital 提供覆盖商业地产、地产开发与私人信贷的专业投资解决方案，帮助投资人把握位于澳大利亚核心区域的稳定、资产抵押型投资机会。",
    hero_kicker_2: "投资人",
    hero_title_2:
      "我们不断挑战自我，开发更具竞争力的投资产品与服务，以满足投资人在变化市场中的持续需求。",
    hero_kicker_3: "私人信贷",
    hero_title_3:
      "短久期、资产抵押型机会，依托严谨的信贷审批、清晰的担保结构与完善的风险控制体系。",

    // STATS
    stat_label_1: "投资人目标回报",
    stat_label_2: "交易规模重点",
    stat_label_3: "期限（月）",
    stat_label_4: "最低投资额",
    stat_label_5: "投资人分配频率",

    // FOOTER / CONTACT / SNAPSHOT / ABOUT（你原文保持）
    footer_top_eyebrow: "投资人专属",
    footer_top_title: "机构级别、资产抵押型投资机会。",
    footer_top_sub:
      "私人信贷策略以严格承销、清晰的担保结构与风险控制为基础，服务更稳健的收益目标。",
    footer_btn_request: "索取资料",
    footer_btn_login: "投资人登录",

    footer_brand_line:
      "澳大利亚投资管理机构，专注于私人信贷与实物资产策略。",
    footer_col_strategies: "策略",
    footer_col_resources: "投资人资源",
    footer_col_contact: "联系方式",
    footer_badge_asset_backed: "资产抵押",
    footer_badge_short_duration: "短久期",
    footer_badge_risk_disciplined: "风控纪律",

    footer_link_private_credit: "私人信贷",
    footer_link_commercial: "商业地产",
    footer_link_development: "开发融资",
    footer_link_portfolio: "组合概览",
    footer_legal_terms: "网站条款",
    footer_legal_privacy: "隐私政策",
    footer_legal_disclaimer: "免责声明",
    contact_city_1: "悉尼",
    contact_city_2: "墨尔本",
    contact_phone: "电话",
    how_it_works: "运作方式",
    documents: "基金文件",
    distributions: "收益分配",
    contact: "联系团队",

    // PRODUCTS PAGE (prd_*)
    prd_kicker: "我们的理念",
    prd_title: "以真实资产为抵押的私人信贷策略",
    prd_sub:
      "在IM Capital，理解并实现客户的目标是我们公司价值观的核心。我们始终秉持“以行动践行信念”的理念。我们曾亲自参与市场测试和投资长达一年，以确保零损失或零利息投资。我们目前专注于单一资产贷款，最终目标是转型为集合基金结构。我们始终坚定不移地履行这一承诺，因为我们深知在商业房地产债务市场中，与客户利益保持一致至关重要。",
    prd_badge_1: "优先级担保",
    prd_badge_2: "真实资产背书",
    prd_badge_3: "短久期",
    prd_badge_4: "聚焦澳洲",
    prd_cta_primary: "索取产品资料",
    prd_cta_secondary: "浏览策略",
    prd_disclaimer: "本页面仅为一般性信息，不构成金融产品建议。",

    prd_metric_1_num: "3 – 24 月",
    prd_metric_1_lbl: "期限（月）",
    prd_metric_2_num: "5m – 50m",
    prd_metric_2_lbl: "交易金额范围",
    prd_metric_3_num: "月度",
    prd_metric_3_lbl: "投资者分配",
    prd_metric_4_num: "A$250,000",
    prd_metric_4_lbl: "最低投资",
    prd_metric_5_num: "10-16% PA",
    prd_metric_5_lbl: "投资者目标回报",


    prd_core_kicker: "产品",
    prd_core_title: "第一顺位抵押产品",
    prd_core_sub:
      "以下为第一顺位抵押示例机会，强调清晰担保、纪律化承销与收益稳定性（示意）。",

    prd_p1_title: "悉尼 Point Piper（NSW）",
    prd_p1_s1_k: "目标回报",
    prd_p1_s1_v: "年化 10%*",
    prd_p1_s2_k: "担保方式",
    prd_p1_s2_v: "第一顺位抵押",
    prd_p1_s3_k: "LVR",
    prd_p1_s3_v: "65%",
    prd_p1_s4_k: "期限",
    prd_p1_s4_v: "12 个月",
    prd_p1_s5_k: "分配频率",
    prd_p1_s5_v: "每月",
    prd_p1_copy:
      "对悉尼 Point Piper 抵押资产的第一顺位抵押再融资（原贷款方为其他私人放贷机构）。",

    prd_p2_title: "East Lindfield（NSW）",
    prd_p2_s1_k: "目标回报",
    prd_p2_s1_v: "年化 10%*",
    prd_p2_s2_k: "担保方式",
    prd_p2_s2_v: "第一顺位抵押",
    prd_p2_s3_k: "LVR",
    prd_p2_s3_v: "80%",
    prd_p2_s4_k: "期限",
    prd_p2_s4_v: "6 个月",
    prd_p2_s5_k: "分配频率",
    prd_p2_s5_v: "每月",
    prd_p2_copy: "用于对既有融资进行再融资的第一顺位抵押贷款。",

    prd_p3_title: "悉尼 Bardwell Park（NSW）",
    prd_p3_s1_k: "目标回报",
    prd_p3_s1_v: "年化 10%*",
    prd_p3_s2_k: "担保方式",
    prd_p3_s2_v: "第一顺位抵押",
    prd_p3_s3_k: "LVR",
    prd_p3_s3_v: "82.5%",
    prd_p3_s4_k: "期限",
    prd_p3_s4_v: "7 个月",
    prd_p3_s5_k: "资产概况",
    prd_p3_s5_v:
      "双砖结构住宅：6 房 4 卫，771㎡，带泳池与高尔夫球场景观（再融资 + 权益释放）。",
    prd_p3_copy:
      "针对悉尼 Bardwell Park 抵押资产的第一顺位抵押再融资与权益释放融资。",

    prd_p_more: "索取详情",
    prd_return_note: "*目标回报仅为指引，并不保证。过往表现不代表未来结果。",

    prd_why_kicker: "投资框架",
    prd_why_title: "以控制下行为第一原则",
    prd_why_sub: "先看结构、抵押质量与退出路径，再谈收益。",
    prd_why_1_title: "资产担保",
    prd_why_1_copy: "每项策略均以可识别、可执行的担保为基础。",
    prd_why_2_title: "短久期策略",
    prd_why_2_copy: "更短期限有助于降低宏观周期影响并提升资金规划确定性。",
    prd_why_3_title: "纪律性承保",
    prd_why_3_copy: "保守 LVR、第三方估值、压力测试后的退出方案。",

    prd_risk_kicker: "风控与保护",
    prd_risk_title: "将风控写进结构里",
    prd_risk_sub: "通过严格流程提前识别风险，并在结构层面保护本金安全。",
    prd_r1: "保守 LVR 阈值与借款人权益对齐",
    prd_r2: "独立估值与法律尽调",
    prd_r3: "匹配资产特征的优先级与担保文件",
    prd_r4: "持续监控、信息披露与退出规划",
    prd_r5: "在适用情况下设置契约条款",

    prd_cta_title: "获取投资概览资料",
    prd_cta_sub: "联系我们索取产品信息，并沟通适配性与投资安排。",
    prd_cta_btn_1: "联系团队",
    prd_cta_btn_2: "了解 IM",


    /* ====== STATS====== */
    stat_label_1: "投资人目标回报",
    stat_label_2: "交易规模重点",
    stat_label_3: "期限（月）",
    stat_label_4: "最低投资额",
    stat_label_5: "投资人分配频率",

    /* ====== PCF HERO ====== */
    pcf_eyebrow: "IM 私人信贷基金",
    pcf_hero_title: "IM 私人信贷基金建立了稳健的历史表现，并持续为投资人提供稳定回报。",
    pcf_hero_sub: "基金体现了纪律性信贷策略，聚焦高质量、具备担保的贷款机会。",

    /* ====== CARDS ====== */
    card_philosophy_title: "我们的理念",
    card_philosophy_p1: "在 IM Capital，理解并实现客户目标是我们的核心价值。我们的理念始终是以行动兑现承诺。",
    card_philosophy_p2: "我们曾用一年的时间亲自测试并投入市场，以验证在可控风险下实现“零损失/零利息”投资的可行性。我们以单一资产贷款为主要方向，并以逐步过渡至集合基金结构为长期目标。",
    card_philosophy_p3: "我们始终坚持这一承诺，认识到在商业地产债务市场中，让我们的利益与客户保持一致的重要性。",

    card_background_title: "背景与专业能力",
    card_background_p1: "在 IM Capital 私人信贷基金正式推出前，我们与董事会共同进行了全面的内部评估。我们始终坚持以行动支撑承诺。",
    card_background_p2: "IM 采用“双重评估”方式：先由信贷团队进行审查，再由 IM Management 的内部地产专家进行复核。",
    card_background_p3: "作为 IM Group 的全资子公司，IM Management 在地产开发领域拥有良好声誉，为 IM 及投资人带来显著优势。",

    /* ====== HIGHLIGHT ====== */
    highlight_title: "单一资产投资",
    highlight_p: "单一资产投资允许投资人及其顾问根据风险偏好与收益目标选择具体机会。投资人可自行设定风险参数，并聚焦偏好的细分资产类别、区域或期限。",

    /* ====== DETAIL – REAL ESTATE ====== */
    detail_title_1: "聚焦不动产抵押资产",
    detail_intro_1: "我们安排以以下类型不动产作为抵押的贷款：",
    detail_asset_1: "澳大利亚主要大都市区域，重点城市包括悉尼、墨尔本与布里斯班。",
    detail_asset_2: "抵押物估值通常在 500万–5000万澳元区间，收购与再融资的流动性相对较强。",
    detail_asset_3: "非特殊用途不动产，包括住宅用地、已完工公寓、一般商业地产以及建设/开发类贷款。",

    /* ====== DETAIL – UNDERWRITING ====== */
    detail_title_2: "承保指标",
    detail_intro_2: "IM Capital 重点关注的承保指标包括：",
    detail_metric_1: "区位与配套条件",
    detail_metric_2: "土地收购价值与条款（对照独立专业估值）",
    detail_metric_3: "先决条件、持续性契约与后续条件",
    detail_metric_4: "担保结构",
    detail_metric_5: "LVR/LTC 比例",
    detail_metric_6: "借款人收入、其他净资产与还款历史",

    /* ====== ABOUT 页面补充 ====== */
    about_cta_note: "仅供一般信息参考，不构成要约或推荐。",

    /* ====== CONTACT US (cu_*) ====== */
    cu_kicker: "联系我们",
    cu_title: "联系 IM Capital",
    cu_sub: "如需投资咨询、合作机会或一般问题，欢迎联系我们。",
    cu_info_title: "联系方式",
    cu_info_desc: "我们通常会在 1–2 个工作日内回复。",
    cu_addr_label: "办公地点",
    cu_addr_value: "澳大利亚 · 新南威尔士州 · 悉尼",
    cu_email_label: "邮箱",
    cu_email_value: "info@initiumcapital.com.au",
    cu_phone_label: "电话",
    cu_phone_value: "+61 2 8372 2404",
    cu_hours_label: "工作时间",
    cu_hours_value: "周一至周五 9:00–17:00（AEST/AEDT）",
    cu_investor_title: "投资人咨询",
    cu_investor_text: "请提供预计投资金额与投资期限，以便我们更快为您对接相关团队。",
    cu_form_title: "发送留言",
    cu_form_desc: "请填写下方表单，我们会尽快与您联系。",
    cu_name: "姓名",
    cu_name_ph: "例如：Alex Chen",
    cu_email: "邮箱",
    cu_email_ph: "例如：alex@email.com",
    cu_subject: "主题",
    cu_subject_ph: "投资咨询 / 合作伙伴 / 其他",
    cu_message: "留言内容",
    cu_message_ph: "请说明您的需求，并补充必要背景信息…",
    cu_submit: "提交",
    cu_note: "提交即表示您同意我们使用您提供的信息用于回复您的咨询。",
    cu_toast: "已收到——您的信息已准备提交。",
    cu_disclaimer: "免责声明：本网站信息仅供一般参考，不构成金融建议。任何投资均存在风险。请结合自身目标并在需要时寻求专业意见。",

    /* ====== COMPANY SNAPSHOT (cs_*) ====== */
    cs_kicker: "公司概览",
    cs_title: "IM Capital — 公司速览",
    cs_sub: "成立于 2021 年，由两家家族办公室及具备商业地产、资管与私人银行深厚经验的合伙人共同创立。我们为超高净值客户与家族办公室提供机构级、资产抵押型投资机会。",

    cs_snap_title: "公司速览",

    cs_label_founded: "成立时间",
    cs_founded: "2021",

    cs_founders_label: "创立背景",
    cs_founders_value: "Huang 家族办公室 · Hayson 家族办公室 · Bo Zhuang",

    cs_positioning_label: "定位",
    cs_positioning_value: "面向超高净值客户与家族办公室的一站式金融服务。",

    cs_focus_label: "聚焦领域",
    cs_focus_value: "商业地产投资、地产开发与私人信贷策略。",

    cs_label_apir_entity: "APIR（实体）",
    cs_label_apir_product: "APIR（商业地产基金）",
    cs_copy_btn: "复制",
    cs_copied_btn: "已复制",

    cs_disclaimer: "APIR 代码仅用于产品识别，不构成要约或推荐。",

    cs_funds_title: "我们的基金",
    cs_pill_core: "核心",
    cs_fund_1: "IM 商业地产基金",
    cs_fund_1_sub: "聚焦悉尼一线核心区域的优质零售与商业资产，并通过主动资产管理提升价值。",

    cs_pill_dev: "开发",
    cs_fund_2: "IM Mosman 开发基金",
    cs_fund_2_sub: "以项目为核心的策略，通过纪律化规划与执行寻求价值创造。",

    cs_pill_credit: "私人信贷",
    cs_fund_3: "IM 私人信贷基金",
    cs_fund_3_sub: "短久期、资产担保的贷款机会，依托严格承保与风险控制。",

    cs_platforms_title: "平台与研究",
    cs_platforms_note: "覆盖澳大利亚主流平台，提升可达性、报告透明度与投资人体验。",

    cs_rating_title: "研究与评级",
    cs_rating_note: "获得独立研究机构覆盖，体现我们对投资治理与流程稳健性的承诺。",

    cs_services_title: "服务",
    cs_service_1: "基金投资管理",
    cs_service_2: "私人财富管理",
    cs_service_3: "地产咨询与管理",
    cs_service_4: "融资与借贷方案",
    cs_service_5: "家族办公室设立与咨询",

    cs_acc_team: "管理层与团队",
    cs_acc_heritage: "家族办公室传承",
    cs_acc_community: "社区与赞助",

    cs_role_founder: "创始合伙人",
    cs_role_bd: "商务总监",
    cs_role_director: "董事",
    cs_role_assistant: "助理经理",

    cs_victor_bio: "Huang 家族办公室 CEO。聚焦 IM 品牌与家族办公室价值传承，拥有丰富的本地与国际地产投资及开发经验。",
    cs_max_bio: "在商业地产收购、租赁、开发规划、工程管理与资产运营方面具备深厚经验，并拥有长期家族办公室传承背景。",
    cs_bo_bio: "15年以上私人银行、财富管理与基金管理经验。曾在亚太及澳新地区担任资深私人银行岗位，RG146 认证。",
    cs_mark_bio: "15年以上商务拓展、财富与基金管理经验。曾任 Westpac 与 Citibank 客户经理，2023 年加入 ",
    cs_stanley_bio: "拥有丰富银行从业经历（Westpac Private、St George、ANZ）。负责运营支持、风控协调与项目统筹，2022 年加入，RG146。",
    cs_will_bio: "负责借贷顾问与融资方案。具备投管、信贷咨询与财务分析背景，管理 200+ 客户/租户关系，持有多项金融与按揭资质。",
    cs_libin_bio: "支持渠道拓展与利益相关方关系管理。2023 年加入 IM 。拥有 UTS 管理与金融硕士学位。",

    cs_heritage_p1: "Hayson 家族在地标性零售与综合体开发方面拥有长期记录，代表项目包括达令港 Harbourside 与皮特街购物中心 Skygarden。",
    cs_heritage_li_1: "Skygarden — Pitt St Mall",
    cs_heritage_li_2: "Manly Wharf 零售开发",
    cs_heritage_li_3: "Kogarah Town Shopping Centre",
    cs_heritage_li_4: "Metropole Shopping Centre（Cremorne）",
    cs_heritage_li_5: "Southpoint Shopping Centre（Hillsdale）",

    cs_csr_1: "自豪支持并赞助 Starlight Five Chefs Dinner —— 以帮助儿童与家庭为目标的标志性筹款活动。",
    cs_csr_2: "作为 Heritage Classic Pro-Am 的主要赞助方，支持需要专业照护与支持的儿童与家庭。",

    /* ====== ABOUT US (about_*) ====== */
    about_eyebrow: "关于 IM CAPITAL",
    about_title: "机构级私人信贷与实物资产策略，建立在纪律化承保之上。",
    about_sub: "IM Capital 是一家澳大利亚投资管理机构，聚焦私人信贷、商业地产与开发相关策略的资产抵押型机会，为超高净值客户与家族办公室提供投资方案。",

    about_badge_1_top: "资产担保",
    about_badge_1_btm: "清晰担保与借款人对齐",
    about_badge_2_top: "风控纪律",
    about_badge_2_btm: "结构化承保与控制",
    about_badge_3_top: "短久期",
    about_badge_3_btm: "提升流动性与韧性",

    about_glance: "核心信息一览",
    about_kpi_1: "成立时间",
    about_kpi_2: "总部所在地",
    about_kpi_3: "核心策略",
    about_kpi_4: "担保优先",
    about_kpi_5_num: "机构级流程",
    about_kpi_5_lab: "信贷 + 地产双重评估，治理驱动决策",
    about_note: "本页信息仅供一般参考，不构成要约或推荐。",

    about_who_kicker: "我们是谁",
    about_who_title: "以信贷纪律为核心的专业团队",
    about_who_p: "我们聚焦具备抵押担保、结构清晰的真实资产机会。流程强调下行保护、担保明确与务实的退出路径，使投资人能够把握核心区域的稳健、资产担保型机会。",
    about_who_c1_title: "担保优先",
    about_who_c1_p: "在交易中优先考虑稳健的担保结构与借款人利益对齐。",
    about_who_c2_title: "承保驱动",
    about_who_c2_p: "以纪律化信贷评估、契约条款与情景压力测试驱动投资决策。",
    about_who_c3_title: "面向投资人设计",
    about_who_c3_p: "重视透明度、报告预期与适合超高净值客户/家族办公室的投资人体验。",

    about_how_kicker: "我们如何投资",
    about_how_title: "覆盖真实资产的可复制框架",
    about_how_p: "我们将信贷承保与地产专业能力结合，评估结构、抵押物质量、借款人画像与退出路径，力求在不同周期保持韧性。",

    about_pillar_1_tag: "支柱 01",
    about_pillar_1_title: "精选资产与区位",
    about_pillar_1_p: "聚焦核心城市市场、考虑流动性的抵押资产，并采用务实估值假设。",
    about_pillar_1_li1: "一线城市核心区位与稳定需求驱动",
    about_pillar_1_li2: "独立估值 + 保守下行情景",
    about_pillar_1_li3: "退出清晰：再融资、出售或计划性偿还",

    about_pillar_2_tag: "支柱 02",
    about_pillar_2_title: "以保护为导向的结构设计",
    about_pillar_2_p: "担保结构、契约条款与文件体系用于保护下行并强化纪律执行。",
    about_pillar_2_li1: "清晰担保包与可执行契约",
    about_pillar_2_li2: "先决/后续条件与持续监控",
    about_pillar_2_li3: "明确的信息披露与治理检查",

    about_pillar_3_tag: "支柱 03",
    about_pillar_3_title: "承保借款人",
    about_pillar_3_p: "评估偿付能力、历史记录、激励一致性与还款路径，而不仅是资产本身。",
    about_pillar_3_li1: "收入、其他净资产与还款历史",
    about_pillar_3_li2: "发起人对齐与过往记录审查",
    about_pillar_3_li3: "保守假设与应急预案",

    about_risk_c1_cap: "信贷审查",
    about_risk_c1_text: "以信贷评估、契约与情景测试为核心的交易审查。",
    about_risk_c2_cap: "地产审查",
    about_risk_c2_text: "独立估值视角、区位质量与资产可售性审查。",
    about_risk_c3_cap: "持续监控",
    about_risk_c3_text: "报告要求、里程碑控制与结构化风控检查。",

    about_team_kicker: "管理层",
    about_team_title: "跨私人银行、地产与投资的综合经验",
    about_team_p: "管理层将信贷纪律与真实资产专业能力结合，并以机构级治理与投资人优先交付为支撑。",

    about_platforms_kicker: "平台",
    about_platforms_title: "覆盖澳大利亚主流平台",
    about_platforms_p: "在主流平台可投有助于提升可达性、报告透明度与投资人体验。",
    about_presence_kicker: "布局",
    about_presence_title: "悉尼与墨尔本",
    about_presence_p: "我们聚焦澳大利亚关键市场，并重点关注核心城市区域。",
    about_loc_1: "悉尼",
    about_loc_2: "墨尔本",

    about_csr_kicker: "社区",
    about_csr_title: "长期社区合作伙伴关系",
    about_csr_p: "我们通过长期合作支持能够为儿童与家庭带来积极影响的项目。",
    about_csr_1: "支持并赞助帮助儿童与家庭的标志性筹款活动。",
    about_csr_2: "支持需要专业照护与支持的儿童与家庭。",

    about_cta_kicker: "下一步",
    about_cta_title: "探索我们的投资策略",
    about_cta_p: "了解我们的私人信贷与真实资产策略如何在结构上实现清晰、纪律与投资人对齐。",
    about_cta_btn_1: "查看产品",
    about_cta_btn_2: "联系我们",

    about_process_kicker: "流程",
    about_process_title: "从筛选到监控——以一致性为目标",
    about_process_p: "清晰的工作流可降低不确定性：定义结构、验证抵押物、承保借款人、完善文件，并监控里程碑直至偿还。",
    about_process_s1_t: "筛选与结构设计",
    about_process_s1_p: "初筛、出具意向条款，并对担保与还款路径达成一致。",
    about_process_s2_t: "尽调与承保",
    about_process_s2_p: "抵押物审查、借款人评估、下行情景与契约设计。",
    about_process_s3_t: "文件与法律框架",
    about_process_s3_p: "明确的法律结构、先决/后续条件与可执行担保包。",
    about_process_s4_t: "监控与管理",
    about_process_s4_p: "持续报告、里程碑跟踪与早期风险信号。",

    about_faq_kicker: "常见问题",
    about_faq_title: "常见问题解答",
    about_faq_p: "仅提供高层信息。如需详细文件，请联系我们。",
    about_faq_q1: "你们语境中的“资产担保”是什么意思？",
    about_faq_a1: "通常指投资敞口由可识别的抵押物与已文件化的担保安排所支持。",
    about_faq_q2: "你们如何管理下行风险？",
    about_faq_a2: "通过承保、保守假设、契约结构、法律文件与持续监控。",
    about_faq_q3: "你们在哪里运营？",
    about_faq_a3: "我们在悉尼与墨尔本运营，并聚焦主要大都市市场。",

    /* ====== INVESTORS v2 (inv2_*) ====== */
    inv2_pill: "投资人通道 • 私人信贷 • 真实资产",
    inv2_h1_pre: "获取",
    inv2_h1_accent: "稳定收益",
    inv2_h1_mid: "并由",
    inv2_h1_ink: "真实资产担保",
    inv2_lead: "IM Capital 通过纪律化承保与清晰退出路径，结构化优先级担保的私人信贷机会，以资本保全为核心。",
    inv2_btn_pack: "索取投资人资料包",
    inv2_btn_overview: "查看策略概览",
    inv2_badge_qualified: "批发/成熟投资人",
    inv2_disclaimer_short: "仅供信息参考 • 非金融建议",
    inv2_chip_lens: "组合视角",
    inv2_chip_senior: "优先级担保",
    inv2_chip_income: "收益导向",
    inv2_kpi_1_label: "目标净回报",
    inv2_kpi_2_label: "常见期限",
    inv2_kpi_3_label: "担保顺位",
    inv2_kpi_3_value: "第一顺位抵押",
    inv2_kpi_4_label: "下行优先",
    inv2_kpi_4_value: "保守 LVR",
    inv2_chart_title: "收益曲线（示意）",
    inv2_chart_note: "仅为示意 • 过往表现不代表未来结果。",
    inv2_ticker_1: "优先级担保结构",
    inv2_ticker_2: "清晰退出路径",
    inv2_ticker_3: "独立估值",
    inv2_ticker_4: "持续监控",
    inv2_ticker_5: "资产担保保护",
    inv2_ticker_6: "短久期聚焦",
    inv2_trust_1_t: "承保纪律",
    inv2_trust_1_p: "以尽调为核心，采用保守结构设计。",
    inv2_trust_2_t: "担保与文件",
    inv2_trust_2_p: "顺位清晰、法律保障完善，并配套契约约束。",
    inv2_trust_3_t: "监控与退出",
    inv2_trust_3_p: "主动管理、里程碑跟踪，并预设还款/退出路径。",
    inv2_edge_title: "为何投资人选择私人信贷",
    inv2_edge_sub: "在公开市场波动时，私人信贷更强调收益韧性与结构化保护。",
    inv2_edge_tag_1: "收益",
    inv2_edge_1_t: "更一致的收益特征",
    inv2_edge_1_p: "以现金流为导向的结构，期限与还款来源明确。",
    inv2_edge_tag_2: "保护",
    inv2_edge_2_t: "优先级担保，下行优先",
    inv2_edge_2_p: "顺位优先 + 资产担保，旨在保护本金。",
    inv2_edge_tag_3: "期限",
    inv2_edge_3_t: "更灵活的短久期",
    inv2_edge_3_p: "较短期限可降低利率敏感性并提升组合灵活度。",
    inv2_strategy_title: "策略体系",
    inv2_strategy_sub: "用投资人关心的方式表达：清晰、可读、可比较。",
    inv2_strategy_badge_1: "核心",
    inv2_strategy_1_t: "优先级担保的不动产贷款",
    inv2_strategy_1_li1: "第一顺位抵押担保",
    inv2_strategy_1_li2: "保守杠杆与估值纪律",
    inv2_strategy_1_li3: "明确退出与监控节奏",
    inv2_strategy_1_link: "查看风控体系 →",
    inv2_strategy_badge_2: "机会型",
    inv2_strategy_2_t: "过桥与特殊情形",
    inv2_strategy_2_li1: "时间敏感且催化因素明确",
    inv2_strategy_2_li2: "结构匹配的收益溢价",
    inv2_strategy_2_li3: "严格文件与备选退出方案",
    inv2_strategy_2_link: "查看示例机会 →",
    inv2_process_title: "风险框架",
    inv2_process_sub: "投资人最在意的：可复制的流程。",
    inv2_step_1_t: "项目来源与初筛",
    inv2_step_1_p: "基于结构、资产质量与退出可信度进行初步筛选。",
    inv2_step_2_t: "估值与法律尽调",
    inv2_step_2_p: "独立估值、产权核查与可执行担保文件。",
    inv2_step_3_t: "结构与契约",
    inv2_step_3_p: "LVR 纪律、契约条款与投资人对齐的保护设计。",
    inv2_step_4_t: "监控与退出",
    inv2_step_4_p: "主动监控、里程碑跟踪与预设退出路径。",
    inv2_final_title: "获取投资人资料包",
    inv2_final_sub: "获取策略摘要、风险框架与示例交易快照。",
    inv2_final_btn_1: "索取资料包",
    inv2_final_btn_2: "预约通话",
    inv2_form_title: "快速申请",
    inv2_form_name_ph: "姓名",
    inv2_form_email_ph: "邮箱",
    inv2_form_submit: "发送",
    inv2_form_note: "我们将在 1 个工作日内回复。",

    // LEGAL mini footer
    legal_mini: "本网站内容仅供一般信息参考，不构成任何金融产品建议。请阅读《免责声明》与《隐私政策》。",
    legal_disclaimer_link: "免责声明",
    legal_privacy_link: "隐私政策",

    // Legal shared
    legal_kicker: "法律与合规",
    legal_updated: "更新日期：2026-01-05",

    // Disclaimer page
    disclaimer_title_tag: "免责声明 | IM Capital",
    disclaimer_h1: "免责声明",
    disclaimer_sub: "关于本网站内容的重要说明。",
    disclaimer_h2_1: "仅供一般信息参考",
    disclaimer_p_1: "本网站所载信息仅供一般信息参考之用，不构成任何金融产品建议、法律建议、税务建议，也不构成任何投资要约或邀请。",
    disclaimer_h2_2: "不得依赖",
    disclaimer_p_2: "您不应仅依赖本网站信息作出投资决策。请在作出任何决定前获取独立专业意见，并结合自身目标、财务状况与需求进行评估。",
    disclaimer_h2_3: "前瞻性陈述",
    disclaimer_p_3: "本网站可能包含前瞻性陈述，其受多项风险与不确定因素影响，实际结果可能与相关陈述存在重大差异。",
    disclaimer_h2_4: "业绩与风险提示",
    disclaimer_p_4: "过往业绩不代表未来表现。投资存在风险，包括但不限于本金损失的可能。",
    disclaimer_h2_5: "第三方链接",
    disclaimer_p_5: "本网站可能包含第三方网站链接。我们不对第三方网站内容、准确性或安全性承担责任。",
    disclaimer_h2_6: "联系我们",
    disclaimer_p_6: "如对本免责声明有任何疑问，请通过 Contact Us 页面与我们联系。",

    // Privacy page
    privacy_title_tag: "隐私政策 | IM Capital",
    privacy_h1: "隐私政策",
    privacy_sub: "我们如何收集、使用并保护您的个人信息。",
    privacy_h2_1: "我们收集的信息",
    privacy_p_1: "当您通过网站与我们联系时，我们可能会收集您提供的个人信息，例如姓名、邮箱、机构信息及咨询内容。",
    privacy_h2_2: "信息使用方式",
    privacy_p_2: "我们使用您的信息用于回复咨询、提供所需信息、改进服务，以及履行法律或监管义务。",
    privacy_h2_3: "信息披露",
    privacy_p_3: "我们可能在保密与安全要求下，与协助运营网站或处理咨询的服务提供商共享相关信息。",
    privacy_h2_4: "信息安全",
    privacy_p_4: "我们会采取合理措施保护个人信息，防止误用、干扰、丢失以及未经授权的访问或披露。",
    privacy_h2_5: "Cookie 与分析工具",
    privacy_p_5: "我们可能使用 Cookie 与分析工具以了解网站使用情况并优化体验。您可通过浏览器设置管理 Cookie。",
    privacy_h2_6: "访问与更正",
    privacy_p_6: "您可联系我们以申请访问或更正您的个人信息。"


  }
};

// =========================
// SAFE STORAGE
// =========================
function storageGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, val) {
  try { localStorage.setItem(key, val); } catch { /* ignore */ }
}

// =========================
// CORE
// =========================
function getCurrentLang() {
  return storageGet("lang") || "en";
}

function setTextByKey(el, key, dict, fallback) {
  if (!key) return;
  if (dict[key] != null) el.textContent = dict[key];
  else if (fallback[key] != null) el.textContent = fallback[key];
}

function setPlaceholderByKey(el, key, dict, fallback) {
  if (!key) return;
  const val = (dict[key] != null ? dict[key] : fallback[key]);
  if (val != null) el.setAttribute("placeholder", val);
}

function setLanguage(lang) {
  const dict = translations[lang];
  const fallback = translations.en;
  if (!dict) return;

  // text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = (el.dataset.i18n || "").trim();
    setTextByKey(el, key, dict, fallback);
  });

  // placeholder nodes (support both naming styles)
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = (el.dataset.i18nPh || "").trim();
    setPlaceholderByKey(el, key, dict, fallback);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = (el.dataset.i18nPlaceholder || "").trim();
    setPlaceholderByKey(el, key, dict, fallback);
  });

  storageSet("lang", lang);
  refreshCopyButtonsText();
}

function updateLangButtonLabel(lang) {
  const langBtn = document.querySelector(".lang-btn");
  if (!langBtn) return;
  const map = { en: "EN", zh: "中文" };
  langBtn.textContent = (map[lang] || String(lang).toUpperCase()) + " ▾";
}

// =========================
// Company Snapshot: Copy buttons
// =========================
function refreshCopyButtonsText() {
  const lang = getCurrentLang();
  const dict = translations[lang] || translations.en;
  const fallback = translations.en;

  document.querySelectorAll(".cs-copy").forEach((btn) => {
    if (btn.classList.contains("is-copied")) return;
    const text =
      (dict.cs_copy_btn != null ? dict.cs_copy_btn : fallback.cs_copy_btn) || "Copy";
    btn.textContent = text;
  });
}

function bindCopyButtons() {
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".cs-copy");
    if (!btn) return;

    const selector = btn.getAttribute("data-copy");
    const target = selector ? document.querySelector(selector) : null;
    if (!target) return;

    const text = (target.textContent || "").trim();
    if (!text) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard API not available");
      }
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    const lang = getCurrentLang();
    const dict = translations[lang] || translations.en;
    const fallback = translations.en;

    const copiedText =
      (dict.cs_copied_btn != null ? dict.cs_copied_btn : fallback.cs_copied_btn) || "Copied";
    const copyText =
      (dict.cs_copy_btn != null ? dict.cs_copy_btn : fallback.cs_copy_btn) || "Copy";

    btn.classList.add("is-copied");
    btn.textContent = copiedText;

    window.setTimeout(() => {
      btn.classList.remove("is-copied");
      btn.textContent = copyText;
    }, 1100);
  });
}

// =========================
// Lang dropdown: robust create + bind
// =========================
function ensureLangDropdown(selectorEl) {
  if (!selectorEl) return null;

  let dropdown = selectorEl.querySelector(".lang-dropdown");
  if (dropdown) return dropdown;

  dropdown = document.createElement("ul");
  dropdown.className = "lang-dropdown";
  dropdown.innerHTML = `
    <li data-lang="en">English</li>
    <li data-lang="zh">中文</li>
  `;
  selectorEl.appendChild(dropdown);
  return dropdown;
}

function bindLangUI() {
  const langBtn = document.querySelector(".lang-btn");
  if (!langBtn) return;

  const selector = document.querySelector(".lang-selector") || langBtn.parentElement;
  const dropdown = ensureLangDropdown(selector);
  if (!dropdown) return;

  langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  dropdown.querySelectorAll("li[data-lang]").forEach((li) => {
    li.addEventListener("click", (e) => {
      e.stopPropagation();
      const lang = li.dataset.lang || "en";
      setLanguage(lang);
      updateLangButtonLabel(lang);
      dropdown.classList.remove("show");
    });
  });

  document.addEventListener("click", (e) => {
    if (selector && selector.contains(e.target)) return;
    dropdown.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dropdown.classList.remove("show");
  });
}

// =========================
// 自动判断当前页面（高亮导航）
// =========================
function setActiveNav() {
  const path = (window.location.pathname || "").toLowerCase();

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (!href) return;

    const key = href.replace("/", "").replace(".html", "");
    if (key && path.includes(key)) link.classList.add("is-active");
  });
}

// =========================
// INIT
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCurrentLang();

  setLanguage(savedLang);
  updateLangButtonLabel(savedLang);

  bindCopyButtons();
  bindLangUI();
  setActiveNav();
});






