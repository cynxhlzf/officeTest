
<%@page import="entities.FileModel"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>ONLYOFFICE</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="css/editor.css" />

        <% FileModel Model = (FileModel) request.getAttribute("file"); %>
        <script type="text/javascript" src="${docserviceApiUrl}"></script>

        <script type="text/javascript" language="javascript">

        var doca;

        var innerAlert = function (message) {
            if (console && console.log)
                console.log(message);
        };

        var onReady = function () {
            innerAlert("Document editor ready");
        };

        var onDocumentStateChange = function (event) {
            var title = document.title.replace(/\*$/g, "");
            document.title = title + (event.data ? "*" : "");
        };

        var onRequestEditRights = function () {
            location.href = location.href.replace(RegExp("mode=view\&?", "i"), "");
        };

        var onError = function (event) {
            if (event)
                innerAlert(event.data);
        };

        var onOutdatedVersion = function (event) {
            location.reload(true);
        };

        var сonnectEditor = function () {
           var config={
        		   "document":{
        			   "fileType": "<%= Model.document.fileType %>",
        			   "key": "<%= Model.document.key %>",
        			   "title": "<%= Model.document.title %>",
        			   "url": "<%= Model.document.url%>"
        		   },
        		   "documentType": "<%= Model.documentType %>",
        		   "editorConfig": {
        			   "callbackUrl":"http://192.168.208.1:8088/CallBackServlet?"+"fileName=<%= Model.document.title %>",
        				"customization":{
        					"forcesave":"true"
        				},	   
	        		   "user": {
	        			   "id": "78ele841",
	        			   "name":"John Smith"
	        		    },
        				"lang":"zh-CN",
        		   },
        		   "height": "100%",
        		   "width": "100%"
           };

            docEditor = new DocsAPI.DocEditor("iframeEditor", config);
        };

        if (window.addEventListener) {
            window.addEventListener("load", сonnectEditor);
        } else if (window.attachEvent) {
            window.attachEvent("load", сonnectEditor);
        }

    </script>

    </head>
    <body>
        <div class="form">
            <div id="iframeEditor"></div>
        </div>
    </body>
</html>
