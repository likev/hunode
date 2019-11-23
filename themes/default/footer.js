

let footer = (data) => {
	let defaults = {
        extraScriptLink: '',
        script: []
    }

    let mergeData = { ...defaults, ...data };
    
    for(let url of mergeData.script){
        mergeData.extraScriptLink += `<script src="${url}"></script>`;
    }

	let footerHtml = `    <script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.2.0/dist/js/bootstrap.min.js"></script>

    <script>
        $(function () {
            $('#toggle-menu').click(function () {
                if ($('body').hasClass('slideout-open')) {
                    $('body').removeClass('slideout-open');
                    this.src = '/zondicons/menu.svg';
                } else {
                    $('body').addClass('slideout-open');
                    this.src = '/zondicons/close.svg';
                }
            })
        });


    </script>
    ${mergeData.extraScriptLink}
    </body>

</html>`;

	return footerHtml;

}

module.exports = footer;



