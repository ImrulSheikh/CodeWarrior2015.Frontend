var uploadImage = {
    upload: function () {
        var url = "http://localhost:64237//api/Profiles/AddImage";

        var accessToken = $('#access-token').val();
        var files = $("#file1").get(0).files;
        if (files.length > 0) {
            var fileData = new FormData();
            for (i = 0; i < files.length; i++) {
                fileData.append(i, files[i]);
                fileData.append('action', 'upload');
                fileData.append('id', i);
            }


            console.log(fileData);
            $.ajax({
                type: "POST",
                url: url,
                contentType: false,
                processData: false,
                headers: uploadImage.getHeaders(accessToken),

                data: fileData,
                success: function(messages) {
                    for (i = 0; i < messages.length; i++) {
                        alert(messages[i]);
                    }
                },
                error: function() {
                    alert("Error while invoking the Web API");
                }
            });
        }

        return false;
    },
    
    getHeaders: function (accessToken) {
        if (accessToken) {

            var hearder = {
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + accessToken
            };
            console.log(hearder);
            return hearder;
        }
    }  

};