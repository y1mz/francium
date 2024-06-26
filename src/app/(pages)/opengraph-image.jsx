import { ImageResponse } from "next/og"
import conf from "/config/siteconfig.json"

// Image metadata
export const alt = conf.SiteName
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
            style={{
                fontSize: 128,
                textDecorationColor: 'white',
                background: '#080e1e',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}
        >
            {conf.HomePage.homeHeader}
        </div>
        ),
      // ImageResponse options
        {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size
    })
}