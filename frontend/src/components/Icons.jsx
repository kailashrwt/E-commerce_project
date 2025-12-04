import React from "react";

export const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
);


export const ShopIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M3 9h18l-1 11H4L3 9Zm2-6h14l1 4H4l1-4Z" />
    </svg>
);

export const GirlIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
    >
        <path d="M12 2.5c-2.2 0-4 1.9-4 4.2s1.8 4.1 4 4.1 4-1.8 4-4.1-1.8-4.2-4-4.2z" />
        <path d="M7.5 14c-1.7 1.1-2.5 2.7-2.5 4.5v1h14v-1c0-1.8-.8-3.4-2.5-4.5-1.3-.9-3-.5-4-.5s-2.7-.4-4 .5z" />
        <path d="M17 4s2 .4 2.8 2S19 10 17.8 10c0 0 .4-2.2-.4-3.2C16.8 5.8 17 4 17 4z" />
    </svg>
);

export const SimpleSearchIcon = ({ className = "" }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
        </svg>
    );
};

export const LinkIcon = ({ className = "" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 1 0-7-7l-1 1" />
        <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 1 0 7 7l1-1" />
    </svg>
);

export const FlashIcon = ({ className = "" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
);

export const PaymentIcon = ({ className = "" }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <path d="M14 14h3M14 17h2.5M14 11h3M14 11c1.5 0 2.5-1 2.5-2H14" />
    </svg>
);

export const SimpleMagic = ({ className = "" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="30" y="30" width="22" height="4" rx="1" transform="rotate(-40 30 30)" />
        <path d="M12 18 L16 22 L20 18 L16 14 Z" fill="currentColor" />
        <path d="M18 8 L20 14 L26 14 L21 17 L23 23 L18 19 L13 23 L15 17 L10 14 L16 14 Z" fill="currentColor" opacity="0.9" />
        <path d="M48 8 L50 12 L52 8 L50 6 Z" fill="currentColor" opacity="0.95" />
        <circle cx="44" cy="20" r="1.6" fill="currentColor" />
    </svg>
);


export const PremiumDiamondLogo = ({ className = "" }) => {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 24L32 8L48 24L32 56L16 24Z" />
            <path d="M32 8L24 24L32 56L40 24L32 8Z" />
        </svg>
    );
};



export const HoopsIcon = ({ className = "w-6 h-6", title = "Hoops" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        {title && <title>{title}</title>}
        <circle cx="12" cy="12" r="7" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    </svg>
);

export const EarringsIcon = ({ className = "w-6 h-6", title = "Earrings" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M12 2a2 2 0 0 0-2 2v6a4 4 0 1 0 4 0V4a2 2 0 0 0-2-2zM8 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
);

export const NecklaceIcon = ({ className = "w-6 h-6", title = "Necklace" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        {title && <title>{title}</title>}
        <path d="M4 10s4-6 8-6 8 6 8 6" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
);

export const BraceletsIcon = ({ className = "w-6 h-6", title = "Bracelet" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
    </svg>
);

export const RingsIcon = ({ className = "w-6 h-6", title = "Rings" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M6 14c1.5-3 6-6 10-4 1 0 2 1 2 2 0 2-3 4-6 4-3 0-5-1-6-2zM4 10c1-2 5-6 10-6" />
    </svg>
);

export const SearchIcon = ({ className = "w-6 h-6", title = "Search" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        {title && <title>{title}</title>}
        <circle cx="11" cy="11" r="5" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
);

export const SettingsIcon = ({ className = "w-6 h-6", title = "Settings" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
        {title && <title>{title}</title>}
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        <path d="M19.4 15a7.9 7.9 0 0 0 .1-1 7.9 7.9 0 0 0-.1-1l2.1-1.6-2-3.5-2.5.6a8 8 0 0 0-1.8-1l-.4-2.6H9.6l-.4 2.6a7.9 7.9 0 0 0-1.8 1L4.9 7.9 2.9 11.4l2.1 1.6a7.9 7.9 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-.6c.5.4 1 .8 1.6 1.1l.4 2.6h4.8l.4-2.6c.6-.2 1.2-.5 1.8-1l2.5.6 2-3.5-2.1-1.6z" />
    </svg>
);

export const DayThemeIcon = ({ className = "w-6 h-6", title = "Light theme" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

export const NightThemeIcon = ({ className = "w-6 h-6", title = "Dark theme" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
);

export const LoginIcon = ({ className = "w-6 h-6", title = "Login" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        {title && <title>{title}</title>}
        <path d="M15 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4" strokeLinecap="round" />
        <path d="M10 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 12H3" strokeLinecap="round" />
    </svg>
);

export const AvatarIcon = ({ className = "w-6 h-6", title = "Avatar" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <circle cx="12" cy="8" r="3" />
        <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
);

export const CartIcon = ({ className = "w-6 h-6", title = "Cart" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        {title && <title>{title}</title>}
        <path d="M3 3h2l1.4 9h11.6l2-6H8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
);

export const IceCreamIcon = ({ className = "w-6 h-6", title = "Ice cream" }) => (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        {title && <title>{title}</title>}
        <path d="M32 6c6 0 10 4 10 8 0 6-8 10-10 10s-10-4-10-10c0-4 4-8 10-8z" fill="currentColor" />
        <path d="M22 28c0 6 10 10 10 10s10-4 10-10" stroke="currentColor" strokeLinecap="round" />
        <path d="M26 42c1.5 3 4.5 10 6 12 1.5-2 5-9 6-12" stroke="currentColor" strokeLinecap="round" />
        <path d="M20 52h24l-6 8H26l-6-8z" fill="currentColor" />
    </svg>
);

export const SaleIcon = ({ className = "w-6 h-6", title = "Sale" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        {title && <title>{title}</title>}
        <path d="M3 12l8-8 10 10-8 8L3 12zM9 9h.01" />
    </svg>
);

export const GiftIcon = ({ className = "w-6 h-6", title = "Gift" }) => (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
        {title && <title>{title}</title>}
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M12 20V7" strokeLinecap="round" />
        <path d="M12 7s3-4 6-4c1.5 0 3 1 3 3 0 3-3 5-3 5" strokeLinecap="round" />
        <path d="M12 7s-3-4-6-4c-1.5 0-3 1-3 3 0 3 3 5 3 5" strokeLinecap="round" />
    </svg>
);

export const FireGlowIcon = ({ className = "w-6 h-6", title = "Fire" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="currentColor"
    >
        {title && <title>{title}</title>}
        <path d="M12 2c2 3 4 5 4 8.5 0 3-2 5.5-4 5.5s-4-2.5-4-5.5c0-1.8.8-3.5 2-4.8-.5 3 .5 4.3 2 5 1.8-2 1.5-4.5 0-8.2Z" />
        <path
            d="M8 13c-2 2-3 3.5-3 6 0 3 3 5 7 5s7-2 7-5c0-2.5-1-4-3-6-.4 2-1.7 3.5-4 3.5S8.4 15 8 13Z"
            opacity=".6"
        />
    </svg>
);

export const DashboardLayoutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="currentColor"
    >
        <rect x="2" y="3" width="6" height="18" rx="1.2" />
        <rect x="10" y="3" width="12" height="5" rx="1.2" />
        <rect x="10" y="10" width="12" height="5" rx="1.2" />
        <rect x="10" y="17" width="12" height="4" rx="1.2" />
    </svg>
);


export const GiftUnder2000Icon = (props) => <GiftIcon {...props} title={props.title ?? "Gift under ₹2000"} />;
export const Gift2100To3500Icon = (props) => <GiftIcon {...props} title={props.title ?? "Gift ₹2100–₹3500"} />;
export const Gift3600To5000Icon = (props) => <GiftIcon {...props} title={props.title ?? "Gift ₹3600–₹5000"} />;

export const FlavorBadge = ({ label = "Flavor", className = "w-20 h-6", bg = null }) => {
    return (
        <svg viewBox="0 0 120 28" className={className} aria-hidden="false" role="img">
            <title>{label}</title>
            <rect x="0.5" y="0.5" width="119" height="27" rx="6" fill={bg ?? "none"} stroke="currentColor" strokeWidth="1" />
            <text x="60" y="18" fontSize="12" fontFamily="Arial, sans-serif" fill="currentColor" textAnchor="middle">
                {label}
            </text>
        </svg>
    );
};

export const Sorbet = (props) => <FlavorBadge label="Sorbet" {...props} />;
export const CitrusChic = (props) => <FlavorBadge label="CitrusChic" {...props} />;
export const BerryMinimum = (props) => <FlavorBadge label="BerryMinimum" {...props} />;
export const ClassicVanilla = (props) => <FlavorBadge label="ClassicVanilla" {...props} />;
export const LuxuriusLime = (props) => <FlavorBadge label="LuxuriusLime" {...props} />;
export const SorbetSensation = (props) => <FlavorBadge label="SorbetSensation" {...props} />;
export const SummerFling = (props) => <FlavorBadge label="SummerFling" {...props} />;
export const LilScoopsies = (props) => <FlavorBadge label="LilScoopsies" {...props} />;
export const SassySorbet = (props) => <FlavorBadge label="SassySorbet" {...props} />;
export const GiftTag = (props) => <FlavorBadge label="Gift" {...props} />;
export const Under2000 = (props) => <FlavorBadge label="Under ₹2000" {...props} />;
export const Range2100To3500 = (props) => <FlavorBadge label="₹2100–₹3500" {...props} />;
export const Range3600To5000 = (props) => <FlavorBadge label="₹3600–₹5000" {...props} />;

export default {
    ShopIcon,
    HoopsIcon,
    EarringsIcon,
    NecklaceIcon,
    BraceletsIcon,
    RingsIcon,
    SearchIcon,
    SettingsIcon,
    DayThemeIcon,
    NightThemeIcon,
    LoginIcon,
    AvatarIcon,
    CartIcon,
    IceCreamIcon,
    SaleIcon,
    GiftIcon,
    GiftUnder2000Icon,
    Gift2100To3500Icon,
    Gift3600To5000Icon,
    FlavorBadge,
    Sorbet,
    CitrusChic,
    BerryMinimum,
    ClassicVanilla,
    LuxuriusLime,
    SorbetSensation,
    SummerFling,
    LilScoopsies,
    SassySorbet,
    GiftTag,
    Under2000,
    Range2100To3500,
    Range3600To5000,
};
