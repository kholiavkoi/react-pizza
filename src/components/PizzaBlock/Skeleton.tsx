import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="255" rx="3" ry="3" width="280" height="24" />
        <rect x="0" y="296" rx="6" ry="6" width="280" height="63" />
        <rect x="0" y="386" rx="3" ry="3" width="95" height="25" />
        <rect x="131" y="378" rx="18" ry="18" width="145" height="38" />
        <circle cx="135" cy="115" r="106" />
    </ContentLoader>
)
