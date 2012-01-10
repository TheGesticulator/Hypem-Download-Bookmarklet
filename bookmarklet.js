(function($){
var tracks = trackList[location.href];
var div = "<div class='download-div' style='position:fixed; bottom: 0px;text-align:center; left:0px;background-color:#F1F2D8;border: 1px solid black; padding:10px; z-index:9999;'><div class='loading-div'>Loading...</div><div style='display:none' class='select-div'><select></select> <a href='#' target='_blank'>Download Link</a></div></div>";

if($('.download-div').length){
	$('.download-div').remove();
}

$('body').append(div);

var urlTemplate = "http://hypem.com/serve/source/[id]/[key]";
var optionTemplate = "<option value='[url]'>[song]</option>";

$('.download-div select').live('change',function(){
	$('.download-div a').prop('href',jQuery('.download-div select').val());
});

$('.download-div a').live('click',function(){
	alert('Right-click and select Save File As');
	return false;
});

(function(x,totalLength){
	$(".loading-div").html('Loading Song ' + (x + 1) + ' of ' + totalLength);
	var urlActual = urlTemplate.replace('[id]',tracks[x].id).replace('[key]',tracks[x].key);
	var recursiveFunc = arguments.callee;
	$.ajax(urlActual,{cache:false, dataType:'json'}).success(function(data){
		var optionActual = optionTemplate.replace('[url]',data.url).replace(['[song]'],tracks[x].artist + ' - ' + tracks[x].song);
		$('.download-div select').append(optionActual);
		if((x + 1)< totalLength){
			recursiveFunc(x + 1, totalLength);
		}else{
			$(".loading-div").hide();
			$(".select-div").show();
		}
	});
})(0,tracks.length)

})(jQuery);