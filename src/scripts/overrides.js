var offlineMode=true;




function loadManagement(){
	
}

function changeTheme(toTheme){
	if($("#cssTheme").attr("href") != "css/"+toTheme){
		$("#cssTheme").attr("href","css/"+toTheme);
	}
}
function showTip(tag){
	try{
		$("#dialogbox").html(compiled_tips[tag]);
		//$("#dialogbox").prepend("<b>"+tag.split('.')[1]+"</b><br>");
		//$('#dialogbox').css({'top':(mouse.y-$("#dialogbox").height()-30),'left':mouse.x});
		var height = $("#dialogbox").height() > 200 ? 200 : $("#dialogbox").height();
		$('#dialogbox').css({'top':(mouse.y-height),'left':mouse.x,'max-height':200,'overflow-y':'auto'});
		$("#dialogbox").show();
			  
		var hasLink=$("#dialogbox").has( "a" ).length;
		//$("#dialogbox").append("<a href=\"javascript:hideTip()\" class='greenPlus'>OK</a>");
		if(!hasLink){
			$("#dialogbox").focus();
			$("#dialogbox").blur(function(){
				$("#dialogbox").hide();
			});
		}
		$("#dialogbox").prepend("<a href=\"javascript:hideTip()\" class='redX' style='float:right;'>X</a>");
	}catch(e){	
		$("#dialogbox").hide();
	}	
}

/*function parseNBT(str){
		tsScoreObjectiveCount=0;
		try{
			var parser = new CMDParser(str);
			parser.parseTheCommand(str);
		}catch(e){
			alertify.alert(e.toString());
			
			$('#disableOutput').prop('checked', false);
			
		}
}*/

function loadItemsAndBlocks(lang){
	function ComparatorDescLength(a, b) {
		 return a[1].length - b[1].length || a[1].localeCompare(b[1]);		
	}
	function ComparatorItemID(a, b) {
		return a[0].localeCompare(b[0]);		
	 }
	 function ComparatorItemDesc(a, b) {
		return a[1].localeCompare(b[1]);		
 	}
	

	let itemsAndBlocksArray = offlineLangs[(lang=='ids') ? 'en' : lang];
	itemsAndBlocks={};
	switch(settings.sortMode){
		case 'item_id': itemsAndBlocksArray = itemsAndBlocksArray.sort(ComparatorItemID); break;
		case 'item_desc': itemsAndBlocksArray = itemsAndBlocksArray.sort(ComparatorItemDesc); break;
		case 'desc_length': 
		default:	itemsAndBlocksArray = itemsAndBlocksArray.sort(ComparatorDescLength);
	}
	
	itemsAndBlocksArray.unshift(["-1","unset","b"]);
	for(let i=0; i<itemsAndBlocksArray.length; i++){
		itemsAndBlocks[itemsAndBlocksArray[i][0]]={d:itemsAndBlocksArray[i][lang=='ids'?0:1],c:itemsAndBlocksArray[i][2]};
	}
	itemsAndBlocks['-1'].d='unset';
	itemsAndBlocksArray=null;
	if(!hasBlockData.length){
		buildListOfBlocksWithData();
	}
	
}