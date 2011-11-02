<!--

function saveCancel() {

        history.go(-1);
        return true;
}

function showSearch() {

    
    if(jQuery('#searchTFoot').is(':visible')) jQuery('#searchTFoot').hide('slow');
    else jQuery('#searchTFoot').show('slow');

}



function setMethod(qmethod) {

	meth = document.getElementById('method');
        meth.value = qmethod;
}


function check_form() {

        from_time = document.getElementById('from_time').value;
        to_time = document.getElementById('to_time').value;

        var dtStart = new Date("1/1/2011 " + from_time);
        var dtEnd = new Date("1/1/2011 " + to_time);
        difference_in_milliseconds = dtEnd - dtStart;

        if (difference_in_milliseconds < 0) {
                document.getElementById('to_time').focus();
                alert("End time is before start time!");
                return false;
        }
        
        var g = document.getElementsByName('location[]');
        var ok = 0;
        for(var i = 0; i < g.length; i++)
	{
                if(g[i].checked) ok=1;
        }
        
        if(!ok) {
            alert("Select minimum one node!");
            return false;        
        }
        
	document.getElementById('task').value="result";
        document.homer.submit();
        return true;
}

function calculateDelta(ms) {

	var a = document.getElementById('delta_value_1');
	var b = document.getElementById('delta_value_2');
	var c = document.getElementById('delta_result');
	if(a.value == "") a.value = ms;
	else if(b.value == "") { 
		b.value = ms;
		c.value = b.value*1 - a.value*1;

	}
	else {
		
		var g = document.getElementsByName('cid[]');
        	for(var i = 0; i < g.length; i++)
	        {
        	        if(g[i].checked) g[i].checked=false;
                }

		a.value = "";
		b.value = "";
		c.value = "";
	} 
}

function showMessage(id,table,tnode,location,contx) {

   var url = "homer.php?task=showmessage&id="+id+"&table="+table+"&tnode="+tnode+"&location="+location;
   
	if ( contx == "1" ) {
			  newwindow = window.open(url,'popupWindow','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no,width=800,height=600,screenX=200,screenY=200,top=50,left=150')
			  if (window.focus) {newwindow.focus()}
	} else {
			
			var mflow = $('<div id="mflow"></div>')
                        .load(url, '', function(response, status, xhr) {
                        if (status == 'error') {
                        var msg = "Sorry but there was an error: ";
                        $(".content").html(msg + xhr.status + " " + xhr.statusText);
                        }})
                        .dialog({
                                autoOpen: true,
                                width: 400,
                                height: 'auto',
                                close: function(e, i) { $(this).remove(); },
                                title: 'MSG ID: '+id
                        })
			.focus()
		}
}

function popMessage(id) {

			var url = "utils.php?task=sipmessage&id="+id;
			var posx = $('body').data('posx');
			var posy = $('body').data('posy');

			jQuery('<div id="'+id+'"></div>').appendTo( jQuery('body') );
			$("#"+id)
                        //var pflow = $('<div id="'+id+'"></div>')
			.load(url, '', function(response, status, xhr) {
                        if (status == 'error') {
                        var msg = "Sorry but there was an error: ";
                        $(".content").html(msg + xhr.status + " " + xhr.statusText);
                        }})
                        .dialog({
                                autoOpen: true,
				stack: true,
                                width: 500,
                                height: 'auto',
				position: [posx + 40, posy -5],
				 open: function(e, i) { $(this).css({ overflow: 'hidden' }); },
                                close: function(e, i) { $(this).remove(); },
                                title: 'MSG ID: '+id
                        })
			.css('zIndex', -1)
			.focus();
						
			document.getElementById(id).focus(); 
}


function showCallFlow(id,table,tnode,location,unique, tag, callid, date, ft, tt) {

  if ( callid.match(/-0$/) )  { callid = callid.replace(/-0$/,""); }

	  var url = "cflow.php?cid="+callid+"&cid2="+callid+"-0";

	  if (date != undefined) {
            url += "&date="+date+"&from_time="+ft+"&to_time="+tt;
          }

			var cflow = $('<div id="cflow"></div>')
                        .load(url, '', function(response, status, xhr) {
                        if (status == 'error') {
                        var msg = "Sorry but there was an error: ";
                        $(".content").html(msg + xhr.status + " " + xhr.statusText);
                        }})
			.dialog({
                                autoOpen: true,
				stack: false,
				width: 'auto',
				position: [10, 80],
				height: 'auto',
				close: function(e, i) { $(this).remove(); },	
                                title: 'Call Flow: '+callid
                        })
			.css('zIndex', -1)
			.focus();			
}



function clear_complete_form() {


	// User
        document.getElementById('ruri_user').value="";
        document.getElementById('to_user').value="";
        document.getElementById('from_user').value="";
        document.getElementById('pid_user').value="";
        document.getElementById('contact_user').value="";
        document.getElementById('auth_user').value="";
        document.getElementsByName('logic_or')[0].checked=false;
	
	//Call
        document.getElementById('callid').value="";
        document.getElementById('callid_aleg')[0].checked=false;
        document.getElementById('from_tag').value="";
        document.getElementById('to_tag').value="";
        document.getElementById('via_1_branch').value="";
        document.getElementById('method').value="";
        document.getElementById('reply_reason').value="";

	//Header
        document.getElementById('ruri').value="";
        document.getElementById('via_1').value="";
        document.getElementById('diversion').value="";
        document.getElementById('cseq').value="";
        document.getElementById('reason').value="";
        document.getElementById('content-type').value="";
        document.getElementById('authorization').value="";
        document.getElementById('user_agent').value="";

	//Time
        document.getElementsByName('location')[0].selected=true;
        document.getElementsByName('date')[0].selected=true;
        document.getElementById('max_records').value="100";

	//Network
        document.getElementById('source_ip').value="";
        document.getElementById('source_port').value="";
        document.getElementById('destination_ip').value="";
        document.getElementById('destination_port').value="";
        document.getElementById('contact_ip').value="";
        document.getElementById('contact_port').value="";
        document.getElementById('originator_ip').value="";
        document.getElementById('originator_port').value="";
        document.getElementsByName('proto')[0].selected=true;
        return true;
}


function clear_form() {


	// User
        document.getElementById('ruri_user').value="";
        document.getElementById('to_user').value="";
        document.getElementById('from_user').value="";
        document.getElementById('pid_user').value="";
        document.getElementsByName('logic_or')[0].checked=false;
	
	//Call
        document.getElementById('callid').value="";

	//Time
        document.getElementsByName('location')[0].selected=true;
        document.getElementsByName('date')[0].selected=true;
        document.getElementById('max_records').value="100";

        return true;
}



function MM_openBrWindow(theURL,winName,features) { //v2.0
          window.open(theURL,winName,features);
}


// Extended Tooltip Javascript
// copyright 9th August 2002, 3rd July 2005, 24th August 2008
// by Stephen Chapman, Felgall Pty Ltd

// permission is granted to use this javascript provided that the below code is not altered
function pw() {return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth}; function mouseX(evt) {return evt.clientX ? evt.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) : evt.pageX;} function mouseY(evt) {return evt.clientY ? evt.clientY + (document.documentElement.scrollTop || document.body.scrollTop) : evt.pageY} function popUp(evt,oi) {if (document.getElementById) {var wp = pw(); dm = document.getElementById(oi); ds = dm.style; st = ds.visibility; if (dm.offsetWidth) ew = dm.offsetWidth; else if (dm.clip.width) ew = dm.clip.width; if (st == "visible" || st == "show") { ds.visibility = "hidden"; } else {tv = mouseY(evt) + 20; lv = mouseX(evt) - (ew/4); if (lv < 2) lv = 2; else if (lv + ew > wp) lv -= ew/2; lv += 'px';tv += 'px';  ds.left = lv; ds.top = tv; ds.visibility = "visible";}}}
                  

function saveCancel() {

	history.go(-1);
        return true;
}


// JS Calendar
var calendar = null; // remember the calendar object so that we reuse
// it and avoid creating another

// This function gets called when an end-user clicks on some date
function selected(cal, date) {
        cal.sel.value = date; // just update the value of the input field
}

// And this gets called when the end-user clicks on the _selected_ date,
// or clicks the "Close" (X) button.  It just hides the calendar without
// destroying it.
function closeHandler(cal) {
        cal.hide();                     // hide the calendar

        // don't check mousedown on document anymore (used to be able to hide the
        // calendar when someone clicks outside it, see the showCalendar function).
        Calendar.removeEvent(document, "mousedown", checkCalendar);
}

// This gets called when the user presses a mouse button anywhere in the
// document, if the calendar is shown.  If the click was outside the open
// calendar this function closes it.
function checkCalendar(ev) {
        var el = Calendar.is_ie ? Calendar.getElement(ev) : Calendar.getTargetElement(ev);
        for (; el != null; el = el.parentNode)
        // FIXME: allow end-user to click some link without closing the
        // calendar.  Good to see real-time stylesheet change :)
        if (el == calendar.element || el.tagName == "A") break;
        if (el == null) {
                // calls closeHandler which should hide the calendar.
                calendar.callCloseHandler(); Calendar.stopEvent(ev);
        }
}

// This function shows the calendar under the element having the given id.
// It takes care of catching "mousedown" signals on document and hiding the
// calendar if the click was outside.
function showCalendar(id) {
        var el = document.getElementById(id);
        if (calendar != null) {
                // we already have one created, so just update it.
                calendar.hide();                // hide the existing calendar
                calendar.parseDate(el.value); // set it to a new date
        } else {
                // first-time call, create the calendar
                var cal = new Calendar(true, null, selected, closeHandler);
                calendar = cal;         // remember the calendar in the global
                cal.setRange(1900, 2070);       // min/max year allowed
                calendar.create();              // create a popup calendar
        }
        calendar.sel = el;              // inform it about the input field in use

	var x = el.offsetLeft
	var y =  el.offsetTop;
	calendar.setDateFormat('dd.mm.y');

        calendar.showAt(x + 400, y + 500);

        // catch mousedown on the document
        Calendar.addEvent(document, "mousedown", checkCalendar);
        return false;
}

function mktime() {
    // *     example 1: mktime(14, 10, 2, 2, 1, 2008);
    // *     returns 1: 1201871402
    // *     example 2: mktime(0, 0, 0, 0, 1, 2008);
    // *     returns 2: 1196463600
    
    var no, ma = 0, mb = 0, i = 0, d = new Date(), argv = arguments, argc = argv.length;
    d.setHours(0,0,0); d.setDate(1); d.setMonth(1); d.setYear(1972);
 
    var dateManip = {
        0: function(tt){ return d.setHours(tt); },
        1: function(tt){ return d.setMinutes(tt); },
        2: function(tt){ set = d.setSeconds(tt); mb = d.getDate() - 1; return set; },
        3: function(tt){ set = d.setMonth(parseInt(tt)-1); ma = d.getFullYear() - 1972; return set; },
        4: function(tt){ return d.setDate(tt+mb); },
        5: function(tt){ return d.setYear(tt+ma); }
    };
    
    for( i = 0; i < argc; i++ ){
        no = parseInt(argv[i]*1);
        if (isNaN(no)) {
            return false;
        } else {
            // arg is number, let's manipulate date object
            if(!dateManip[i](no)){
                // failed
                return false;
            }
        }
    }
 
    return Math.floor(d.getTime()/1000);
}




//-->