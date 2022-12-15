$(document).ready(() => {
    $("#loading").delay(2000).fadeOut('fast')
    // length of the top anime available from API
    let rand = Math.floor(Math.random() * 20);
    let inc = rand;
    let apiUrl = 'http://127.0.0.1:3005/api/';

    // search function
    async function getSearch() {
        for (let i = 1; i < 4; i++) {
            try {
                let input = $("#search").val()
                let res = await fetch(`https://api.jikan.moe/v4/anime?q=${input}&sfw`)
                let resJSON = await res.json()
                changeToSearch(resJSON, i)
      
            } catch (error) {
                alert("Please enter a valid title!");
                break
            }
        }
    }

    // Function changes the images and other data after calling the GET
    function changeToSearch(url, i) {
        imageData = url.data[i].images.jpg.large_image_url;
        backgroundData = url.data[i].background
        titleData = url.data[i].title
        

        if (imageData != null) {
            document.getElementById(`img-post-${i}`).src = imageData;
        }
        else {
            console.log("HIHIH")
        }

        if (backgroundData != null){
            document.getElementById(`desc-${i}`).innerHTML = backgroundData;
        }

        if (titleData != null){
            document.getElementById(`title-${i}`).innerHTML = titleData;
        }
    }


    
    // makes a search
    $("#search-btn").click(() => {
        getSearch()
        var input = $("#search").val()
        $("#complete-val").text('Results for: ' + input)
    });

    // POST METHOD, adds anime to the list
    $(".button-completed").click((event) => {
        var buttonID = $(event.target).attr('id');
        var newID = buttonID.charAt(buttonID.length - 1)
        
        const body = {
            title: $(`#title-${newID}`).text(),
            img: $(`#img-post-${newID}`).attr('src'),
            desc: $(`#desc-1-${newID}`).text(),
            seen: 0
        }

        $.ajax({
            type: "POST",
            url: apiUrl + 'completed/',
            data: JSON.stringify(body),
            processData: false,
            contentType: 'application/json',
            success: (res) => {
                console.log("Success " + res)
                $("#complete-val").text(body.title + ' has successfully been added.').css("color", "green")
            },
            error: (err) => {
                console.log(err);
                $("#complete-val").text(body.title + ' has already been added.').css("color", "red")
                }   
        });
    })

//    Deletes an anime from the list
    $(document).on('click', '.button-removed', ((event) => {
        if (confirm("Are you sure you want to delete this item from your list?")) {
            var buttonID = $(event.target).attr('id');
            var newID = buttonID.charAt(buttonID.length - 1);

            const body = {
                title: $(`#title-complete-${newID}`).text()
            }

            $.ajax({
                type: "DELETE",
                url: apiUrl + 'deleted/',
                data: JSON.stringify(body),
                processData: false,
                contentType: 'application/json',

                success: (res) => {
                    console.log("Success " + res);
                    $("#complete-val").text(body.title + ' has been deleted. Refresh!').css("color", "green");
                },
                error: (err) => {
                    console.log(err);
                    $("#complete-val").text(body.title + ' does not exist.').css("color", "red");
                }   
            })
        }
        
    }));

    // updates the number of episodes
    $(document).on('click', '.button-updated', ((event) => {
        var buttonID = $(event.target).attr('id');
        var newID = buttonID.charAt(buttonID.length - 1);
        var input = $(`#ep-${newID}`).val()

        const body = {
            title: $(`#title-complete-${newID}`).text(),
            seen: input
        }

        $.ajax({
            type: "PUT",
            url: apiUrl + 'completed',
            data: JSON.stringify(body),
            processData: false,
            contentType: 'application/json',

            success: (res) => {
                console.log("Success " + res);
                $("#complete-val").text(body.title + ' has successfully been updated. Please refresh.').css("color", "green");
            },
            error: (err) => {
                
                $("#complete-val").text(body.title + ' does not exist.').css("color", "red");
            }   
        })
    }));
    
    // show the list of completed animes
    $("#show-list").click(() => {
        $("#complete-list").show("slide", {direction: "up" }, 500)
        showCompleted()
    })

    // hide
    $("#hide-list").click(() => {
        $("#complete-list").hide("slide", {direction: "up"}, 500)
        
    })
    // update the list after making changes
    $("#refresh-list").click(() => {
        showCompleted()
    })

    // Get function to get all completed animes and display them
    function showCompleted() {
        $.getJSON(apiUrl + 'completed/', (completed) => {
            completeAnime = completed
            let animeList = '<div id = "all-completed"></div>'
            let mainDiv = $(animeList)
            let newDiv = ''
            
            if (completeAnime.length === 0){
                newDiv = '<h4>Add new anime here</h4>'
            } else {
                completeAnime.forEach((a, index) => {
                    newDiv = `<div class = "complete-box" id = "complete-${index}">`
                    newDiv += (`<div id = "title-complete-${index}">` + `<b>${a.title}</b></div>`)
                    newDiv += (`<div id = "seen-complete-${index}">` + a.seen + ' episodes' + '</div>')
                    newDiv += (`<button id = "update-${index}" class="button-updated">Update Eps</button>`)
                    newDiv += (`<input id = "ep-${index}" class ="ep-input" type="text" placeholder="0">`)
                    newDiv += (`<button id = "remove-${index}" class="button-removed">X</button>`)
                    newDiv += '</div>' 
                    mainDiv.append(newDiv)
                    
                })
            }

            $("#complete-val").text(`You have ${completeAnime.length} animes in Your Anime List`).css("color", "white")
            $("#complete-list").html(mainDiv)
        })
    }
    
    // change the values of the reccomendations on loading by random
    async function changeVal() {
        for (let i = 1 + inc; i < 1 + inc + 3; i++) {
            let res = await fetch('https://api.jikan.moe/v4/top/anime')
            let resJSON = await res.json()
            changeValues(resJSON, i)
        }
    }
    
    function changeValues(url, i) {
       
        imageData = url.data[i].images.jpg.large_image_url;
        backgroundData = url.data[i].synopsis
        titleData = url.data[i].title
        

        if (imageData != null){
            
            document.getElementById(`img-post-${i-inc}`).src = imageData
        }

        if (backgroundData != null){
            document.getElementById(`desc-${i-inc}`).innerHTML = backgroundData
        }

        if (titleData != null){
            document.getElementById(`title-${i-inc}`).innerHTML = titleData
        }
 
    }

  
    // hide the description by default
    $("#desc-1").hide();
    $("#desc-2").hide();
    $("#desc-3").hide();
    // allow users to click the image and description to toggle
    function swapImgDesc() {
        $(".img-rec").click((event) => {
            var imgID = $(event.target).attr('id');
            var newID = imgID.charAt(imgID.length - 1)
            $(`#img-post-${newID}`).hide();
            $(`#desc-${newID}`).show("slide", {direction: "right" }, 500);
        });
    
        $(".desc-rec").click((event) => {
            var descID = $(event.target).attr('id');
            var newID = descID.charAt(descID.length - 1)
            $(`#img-post-${newID}`).show("slide", {direction: "left" }, 500);
            $(`#desc-${newID}`).hide();
        });
    
        
    };
    
    swapImgDesc()
    changeVal()

});