const Analytics = () => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=G-P5TREVYBXB`} />
    <script
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P5TREVYBXB');
          `,
      }}
    />
  </>
)

export default Analytics
