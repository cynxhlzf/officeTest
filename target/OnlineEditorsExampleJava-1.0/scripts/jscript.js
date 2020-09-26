if (typeof jQuery !== "undefined") {
    jq = jQuery.noConflict();

    jq(function () {
        jq("#fileupload").fileupload({
            dataType: "json",
            add: function (e, data) {
                jq(".error").removeClass("error");
                jq(".done").removeClass("done");
                jq(".current").removeClass("current");
                jq("#step1").addClass("current");
                jq("#mainProgress .error-message").hide().find("span").text("");
                jq("#mainProgress").removeClass("embedded");

                jq.blockUI({
                    theme: true,
                    title: "Getting ready to load the file" + "<div class=\"dialog-close\"></div>",
                    message: jq("#mainProgress"),
                    overlayCSS: { "background-color": "#aaa" },
                    themedCSS: { width: "656px", top: "20%", left: "50%", marginLeft: "-328px" }
                });
                // jq("#beginEdit, #beginView, #beginEmbedded").addClass("disable");

                data.submit();
            },
            always: function (e, data) {
                if (!jq("#mainProgress").is(":visible")) {
                    return;
                }
                var response = data.result;
                if (response.error) {
                    jq(".current").removeClass("current");
                    jq(".step:not(.done)").addClass("error");
                    jq("#mainProgress .error-message").show().find("span").text(response.error);
                    jq('#hiddenFileName').val("");
                    return;
                }

                jq("#hiddenFileName").val(response.filename);
                console.log("response.filename"+response.filename);

                // checkConvert();
                //准备参数（从配置文件中读取参数配置）  暂时没用
                readyParams();
            }
        });
    });
    var readyParams = function () {
        jq.ajax({
            "url": "http://192.168.1.120:8088/PramsServlet?type=conver",
            "data": "",
            "type": "post",
            "dataType": "json",
            "success": function(json) {
                // http://192.168.1.120:8088/EditorServlet?fileExt=docx
                // http://192.168.1.120:8088/EditorServlet?mode=edit&fileName=newtest
                // http://192.168.1.120:8088/EditorServlet?mode=edit&fileName=newtest.docx
            }
        });

    };
    var UrlEditor = "EditorServlet";
    //编辑
    jq(document).on("click", "#beginEdit", function () {
        var fileId = encodeURIComponent(jq("#hiddenFileName").val());
        var url = UrlEditor + "?mode=edit&fileName=" + fileId;
        //
        window.open(url, "_blank");
        // jq("#hiddenFileName").val("");
        // jq.unblockUI();
    });

    jq(document).on("click", "#beginView", function () {
        var fileId = encodeURIComponent(jq("#hiddenFileName").val());
        console.log(fileId);
        var url = UrlEditor + "?mode=view&fileName=" + fileId;
        window.open(url);
        jq("#hiddenFileName").val("");
        // jq.unblockUI();
    });

    jq(document).on("click", "#beginEmbedded:not(.disable)", function () {
        var fileId = encodeURIComponent(jq("#hiddenFileName").val());
        var url = UrlEditor + "?mode=embedded&fileName=" + fileId;

        jq("#mainProgress").addClass("embedded");
        jq("#beginEmbedded").addClass("disable");

        jq("#embeddedView").attr("src", url);
    });

    jq(document).on("click", "#cancelEdit, .dialog-close", function () {
        jq('#hiddenFileName').val("");
        jq("#embeddedView").attr("src", "");
        jq.unblockUI();
    });

    jq.dropdownToggle({
        switcherSelector: ".question",
        dropdownID: "hint"
    });
}