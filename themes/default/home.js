

let home = (data) => {
    let defaults = {
        homeContent: ''
    }

    let mergeData = { ...defaults, ...data };

    let homeHtml = `<body>
    <div class="container">
        <div class='row'>

            <nav id='main-nav' class='slideout-menu'>
                <ul class='nav-links' id='nav-links'>
                    <li><a class='active' href='/'>主页</a></li>
                    <li><a href='/archive/'>归档</a></li>
                </ul>
            </nav>


            <div class='main-article'>
                <nav class="nav-main-mobile "><img id='toggle-menu' src='/zondicons/menu.svg' height=24 width=24 />
                </nav>
                <nav class="nav-main-desktop "><a href="/" class="logo"><img id='home' src='/zondicons/home.svg'
                            height=30 width=30 /></a>
                    <ul class="nav-links">
                        <li><a class='active' href='/'>主页</a></li>
                        <li><a href='/archive/'>归档</a></li>
                    </ul>
                </nav>
                <article id='article'>
                    <!-- 
                  <header class="article-header" >
                    <h1>${mergeData.articleTitle}</h1>
                  </header>
                  -->

                    <div class='archive'>
                        ${mergeData.homeContent}
                    </div>

                    <footer class='article-end-line'><span>THE END</span></footer>
                </article>

                <footer>
                    <div id='comments'>
                    </div>
                </footer>


            </div>

        </div>
    </div>`;

    return homeHtml;

}

module.exports = home;



