import ContentLoader from 'react-content-loader'

export function ProfileLoader() {

    return (
        <ContentLoader speed={2}
            width={'100%'}
            height={'100%'}
            viewBox="0 0 1400 700"
            backgroundColor="#ff5900"
            foregroundColor="#000000">
            <rect x="320" y="70" rx="10" ry="20" width="150" height="20" />
            <rect x="320" y="100" rx="8" ry="20" width="250" height="15" />
            <rect x="320" y="130" rx="8" ry="20" width="200" height="15" />
            <rect x="1160" y="10" rx="0" ry="20" width="100" height="30" />
            <rect x="1285" y="10" rx="0" ry="20" width="100" height="30" />

            <circle cx="150"  cy="150" r="150" />
        </ContentLoader>
    );
}

export function ProductLoader() {
    return ( 
        <ContentLoader viewBox="0 0 778 116" width={'100%'} height={'100%'}  backgroundColor="#ff5900" foregroundColor="#000000">
        <rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
        <rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
        <rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
        <rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
        <rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
      </ContentLoader>
     );
}

export default ProductLoader;