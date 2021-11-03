require("babel-register") ({
    presets: ["es2015", "react"]
});
const router = require("./sitemapRouter").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
        new Sitemap(router)
            //.build("http://localhost:3000")
            .build("https://www.sizelity.com")
            .save("./public/sitemap.xml") 
    ); 
}

generateSitemap();