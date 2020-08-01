$(function(){

$.ajax({
	method:'GET',
	url: 'api/videos',
	success: function(videos){
		$.each(videos, function(i, video){
			$("#videolist").append('<li style="list-style-type:none; float:left; padding: 16px"><img src="../images/'+ video._id +'.jpg" style="width: 200px; height: 200px"><br>' + video.title + '</li>');
		});
	},
	error: function(){
		alert("Error loading videos");
	
	}

});



/* POST method for api/videos is defined in videos.js */

$('#add').click(function(){
	var vtitle = $("#title").val();
	var vgenre = $("#genre").val();
	var vdesc = $("#desc").val();

	var video = {
		title: vtitle,
		genre: vgenre,
		description: vdesc
	}
	$.ajax({
		method:'POST',
		url: 'api/videos',
		data: video,
		success: function(newVideo){
			$("#videolist").append('<li>' + newVideo.title+ '</li>');			
		},
		error: function(){
			alert("Error inserting video");
		
		}

	});

	

});




});
