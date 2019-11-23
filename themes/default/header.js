

let header = (data) => {
	let defaults = {
		pageTitle: '',
		extraCssLink: '',
		css: []
	}

	let mergeData = { ...defaults, ...data };

	for(let url of mergeData.css){
        mergeData.extraCssLink += `<link rel="stylesheet" href="${url}"> `;
    }

	let headerHtml = `<!doctype html>

	<html>
	
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">
		<meta content="" name="description" />
	
		<title>${mergeData.pageTitle}</title>
	
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.2.0/dist/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.2.0/dist/css/bootstrap-theme.min.css">
	
		<style>
			.affix {
				position: fixed;
				top: 20px;
			}
	
			body {
				color: #34495e;
				font-size: 15px;
				line-height: 1.6;
				font-family: 'sourcesanspro', 'Helvetica Neue', Arial, sans-serif;
			}
	
			.slideout-menu {
				position: fixed;
				top: 0;
				bottom: 0;
				width: 200px;
				z-index: 0;
				display: none;
				background-color: #3c4858;
				box-shadow: inset -8px 0 8px rgba(0, 0, 0, .15);
				color: #fff;
				padding: 26px;
			}
	
			.slideout-open .slideout-menu {
				display: block;
			}
	
			.slideout-menu ul {
				list-style: none;
				margin: 0;
				margin-bottom: 0px;
				padding: 0;
			}
	
			.slideout-menu ul a {
				font-family: sofia-pro-soft, sans-serif;
				color: #fff;
				display: block;
				padding: 8px 0;
				font-size: 16px;
				cursor: pointer;
				text-decoration: none;
				background-color: transparent;
			}
	
			.nav-main-mobile {
				background: transparent;
				display: block;
				padding: 16px 24px 16px 0px;
				z-index: 10;
				position: relative;
				cursor: pointer;
			}
	
			.nav-main-desktop {
				display: none;
			}
	
			.main-article {
				padding: 0 20px 20px 20px;
				margin-bottom: 10px;
			}
	
	
			.slideout-open .main-article {
				margin-left: 200px;
				overflow: hidden;
			}
	
			/*
				#article h2, #article h3, #article h4, #article h5, #article h6 {
					position: relative;
				}
				
				#article h2::before, #article h3::before, #article h4::before, #article h5::before, #article h6::before {
					content: "#";
					color: #42b983;
					position: absolute;
					left: -0.8em;
					top: -2px;
					font-size: 1.2em;
				}
				*/
			#article img{
				max-width: 100%;
			}
	
			.article-header {
				border-bottom: 1px solid #eee;
				padding-bottom: 16px;
				margin-bottom: 40px;
			}
	
			.article-end-line {
				display: block;
				text-align: center;
				border-bottom: 1px solid #eee;
				line-height: 0.1em;
				margin: 50px 20px 30px 20px;
	
			}
	
			.article-end-line span {
				background: #fff;
				padding: 0 10px;
			}
	
			.archive {
				margin: 5em auto;
			}
	
			.archive ul {
				list-style: none;
			}
	
			.archive .post-item {
				padding: 2px 0 0 50px;
			}
	
			.archive .post-info {
				float: left;
				width: 160px;
				color: #7f8c8d;
			}
	
			.archive .post-title-link {
				display: block;
				margin-left: 160px;
				color: #42b983;
				word-break: break-all;
			}
	
			.article-info {
				margin-top: 20px;
			}
	
			.article-info::after {
				content: "";
				display: block;
				clear: both;
			}
	
			.author-info {
				float: left;
			}
	
			.avatar {
				margin-right: 8px;
				border-radius: 1000px;
			}
	
			.post-date {
				float: right;
				padding-top: 1px;
			}
	
			@media (min-width:768px) {
				.nav-main-mobile {
					display: none;
				}
	
				.nav-main-desktop {
					display: block;
					padding: 16px 24px 16px 0px;
				}
	
				.nav-main-desktop ul {
					list-style: none;
					float: right;
					margin: 0;
					margin-bottom: 0px;
					padding: 0;
				}
	
				.nav-main-desktop ul.nav-links li {
					display: inline-block;
				}
	
				.nav-main-desktop ul a {
					font-family: sofia-pro-soft, sans-serif;
					color: #2c3e50;
					display: block;
					padding: 0 6px 10px 6px;
					font-size: 20px;
					cursor: pointer;
					text-decoration: none;
					background-color: transparent;
				}
	
				.nav-main-desktop ul.nav-links a.active,
				.nav-main-desktop ul.nav-links a:hover {
					border-bottom: 2px solid #42b983;
				}
	
				.main-article {
					width: 720px;
					margin: 0 auto;
				}
	
			}
		</style>
		${mergeData.extraCssLink}
	</head>`;

	return headerHtml;

}

module.exports = header;



