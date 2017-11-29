$(function(){
	//获取时间
    var nowTime = new Date();
    var nowYear = nowTime.getFullYear();//当前年
    var nowMonth = nowTime.getMonth()+1; //当前月
    var prevMonth = nowTime.getMonth(); //上个月
    var nowDay = nowTime.getDate(); //当前日

    var nowMonthDay = new Date(nowYear,nowMonth,1);  //取当年当月中的第一天 
    var Monthday =   (new Date(nowMonthDay.getTime()-1000*60*60*24)).getDate();//获得当前月有多少天

    var nowEndWeek = new Date(nowYear,nowMonth-1,Monthday).getDay();//当前年的当前月的最后一天是星期几
    
    var prevMonthDay = new Date(nowYear,prevMonth,1);  //取当年上个月的第一天 
    var prevMonthday =   (new Date(prevMonthDay.getTime()-1000*60*60*24)).getDate();//获得当前年上个月有多少天

    var Week = new Date(nowYear,nowMonth-1,1).getDay();//当前年的当前月的第一天是星期几

	//---获取时分秒
    function Time(){
    	var nowTime = new Date();
    	var times=nowTime.getHours();
        if(times<10){
            $('.calendarSelect-time-hour').html("0"+times+" : ");
        }else{
            $('.calendarSelect-time-hour').html(times+" : ");
        }
        var minutes=nowTime.getMinutes();
        if(minutes<10){
            $('.calendarSelect-time-minute').html("0"+minutes+" : ");
        }else{
            $('.calendarSelect-time-minute').html("&nbsp;"+minutes+" : ");
        }
        var miao=nowTime.getSeconds();
        if(miao<10){
           $('.calendarSelect-time-second').html(" 0"+miao);
        }else{
            $('.calendarSelect-time-second').html("&nbsp;"+miao);
        }
    }
    setInterval(Time,1000);
    //获得当前年月日
    $(".calendarSelect-year-show").html(nowYear + "年");
    $(".calendarSelect-year-show").val(nowYear);
    $(".calendarSelect-month-show").html(nowMonth);
    $(".calendarSelect-month-show").val(nowMonth);

    //选择年份月份
    function yearOrMonth(){
    	//年份选择框隐藏出现
	    $(".calendarSelect-year-show").click(function(){
	    	if($(".calendarSelect-year-ul").css("display") == "none"){
	    		$(".calendarSelect-year-ul").css({display:"block"});
	    	}else{
	    		$(".calendarSelect-year-ul").css({display:"none"});
	    	}
	    })
	    //月份选择框隐藏出现
	    $(".calendarSelect-month-show").click(function(){
	    	if($(".calendarSelect-month-ul").css("display") == "none"){
	    		$(".calendarSelect-month-ul").css({display:"block"});
	    	}else{
	    		$(".calendarSelect-month-ul").css({display:"none"});
	    	}
	    })


	    //选择年份值
	    $(".calendarSelect-year-ul li").each(function(){
	    	$(this).click(function(){
	    		$(".calendarSelect-year-show").html($(this).val()+"年");
	    		$(".calendarSelect-year-show").val($(this).val());
	    		$(".calendarSelect-year-ul").css({display:"none"});
	    		var setMonth = $(".calendarSelect-month-show").html();
	    		$(".calendarSelect-everyData").html("");
	    		getYearMonth($(this).val(),setMonth)
	    	})

	    })
	    //选择月份值
	    $(".calendarSelect-month-ul li").each(function(){
	    	$(this).click(function(){
	    		$(".calendarSelect-month-show").html($(this).val());
	    		$(".calendarSelect-month-show").val($(this).val());
	    		$(".calendarSelect-month-ul").css({display:"none"});
	    		var setYear = $(".calendarSelect-year-show").val();
	    		getYearMonth(setYear,$(this).val())
	    		
	    	})
	    })

	    //加减月份
	    $(".calendarSelect-month-next").click(function(){
	    	var years = $(".calendarSelect-year-show").val();
	    	var months = $(".calendarSelect-month-show").html() * 1;
	    	if(months > 1){
	    		$(".calendarSelect-month-show").html(months - 1);
	    		var setMonth = $(".calendarSelect-month-show").html();
	    		$(".calendarSelect-month-ul").css({display:"none"});
	    		getYearMonth(years,setMonth)
	    	}
	    })
	     $(".calendarSelect-month-up").click(function(){
	     	var years = $(".calendarSelect-year-show").val();
	    	var months = $(".calendarSelect-month-show").html() * 1;
	    	if(months < 12){
	    		$(".calendarSelect-month-show").html(months + 1);
	    		var setMonth = $(".calendarSelect-month-show").html();
	    		$(".calendarSelect-month-ul").css({display:"none"});
	    		getYearMonth(years,setMonth)
	    	}
	    })
    }
    	yearOrMonth();

   
    
    function monthData(){
    	if(nowMonth == 1){
    		preYear = (nowYear * 1) - 1;
    		preMonth = 12;
    		nextYear = nowYear;
    		nextMonth = nowMonth + 1;
    	}else if(nowMonth == 12){
    		preYear = nowYear;
    		preMonth = 11;
    		nextYear = (nowYear * 1) + 1;
    		nextMonth = 1;
    	}else{
    		preYear = nowYear;
    		preMonth = (nowMonth * 1) - 1;
    		nextYear = nowYear;
    		nextMonth = (nowMonth * 1) + 1;
    	}
    	
    	var html = "";
        var addbeforezero = "";
        var monthaddbeforezero = "";
    	for( i=1; i <= Monthday;i++){
            addbeforezero = "";
            monthaddbeforezero = "";
            if(i < 10){
                addbeforezero = "0";
            }
            if(nowMonth < 10){
                monthaddbeforezero = "0";
            }
        	var everyWeek = new Date(nowYear,nowMonth-1,i).getDay()
        	 html += '<li>'
        		+ 	'<span name="'+everyWeek+'">'+i+'</span>'
        		+ 	'<input type="hidden" class="" value="'+nowYear+'/'+monthaddbeforezero+nowMonth+'/'+addbeforezero+i+'"/>'
        		+ '</li>'
    	}
    	$(".calendarSelect-everyData").html(html);
    	
    	for(j=prevMonthday; j>=prevMonthday-Week+1;j--){
            addbeforezero = "";
            monthaddbeforezero = "";
            if(j < 10){
                addbeforezero = "0";
            }
            if(preMonth < 10){
                monthaddbeforezero = "0";
            }
			$('<li class="calendarSelect-on">'
			+ 	'<span class="calendarSelect-everyData-add-span">'+j+'</span>'
			+ 	'<input type="hidden" value="'+preYear+'/'+monthaddbeforezero+preMonth+'/'+addbeforezero+j+'"/>'
			+ '</li>').prependTo(".calendarSelect-everyData");
	    }

	    for(m = 1; m < 6 - nowEndWeek; m++){
            addbeforezero = "";
            monthaddbeforezero = "";
            if(j < 10){
                addbeforezero = "0";
            }
            if(preMonth < 10){
                monthaddbeforezero = "0";
            }
	    	$(".calendarSelect-everyData").append('<li class="calendarSelect-on">'
			+ 	'<span class="calendarSelect-everyData-add-span">'+(m)+'</span>'
			+ 	'<input type="hidden" value="'+nextYear+'/'+monthaddbeforezero+nextMonth+'/'+addbeforezero+(m+1)+'"/>'
			+ '</li>');
	    }

    }
    	monthData();

    function getYearMonth(year,month){
    	var preYear;
    	var preMonth;
    	var nextYear;
    	var nextMonth;
    	if(month == 1){
    		preYear = (year * 1) - 1;
    		preMonth = 12;
    		nextYear = year;
    		nextMonth = month + 1;
    	}else if(month == 12){
    		preYear = year;
    		preMonth = 11;
    		nextYear = (year * 1) + 1;
    		nextMonth = 1;
    	}else{
    		preYear = year;
    		preMonth = (month * 1) - 1;
    		nextYear = year;
    		nextMonth = (month * 1) + 1;
    	}
    	// console.log("选择的年"+ year)
    	// console.log("选择的月"+ month)
    	var day = new Date(year,month,0);    
    	var getMonthDay = day.getDate();
    	var prevDay = new Date(year,month-1,0);//上一个月
    	var getPrevMonthDay = prevDay.getDate();//上一个月多少天
    	var getWeek = new Date(year,month-1,1).getDay();//选择年月的第一天是星期几
    	// console.log(getWeek)
    	var endWeek = new Date(year,month-1,getMonthDay).getDay();//选择年月的最后一天是星期几
    	// console.log(endWeek)
    	var html = "";
        var addbeforezero = "";
        var monthaddbeforezero = "";
    	for( i=1; i <= getMonthDay;i++){
            addbeforezero = "";
            monthaddbeforezero = "";
            if(i < 10){
                addbeforezero = "0";
            }
            if(month < 10){
                monthaddbeforezero = "0";
            }
        	var geteveryWeek = new Date(year,month-1,i).getDay()
        	html += '<li>'
        		+ 	'<span name="'+geteveryWeek+'">'+i+'</span>'
        		+ 	'<input type="hidden" class="" value="'+year+'/'+monthaddbeforezero+month+'/'+addbeforezero+i+'"/>'
        		+ '</li>'
    	}
    	$(".calendarSelect-everyData").html(html);
    	// console.log(getPrevMonthDay)
    	for(j = getPrevMonthDay; j >= getPrevMonthDay-getWeek+1 ; j--){
            addbeforezero = "";
            monthaddbeforezero = "";
            if(j < 10){
                addbeforezero = "0";
            }
            if(preMonth < 10){
                monthaddbeforezero = "0";
            }
			$('<li class="calendarSelect-on">'
			+ 	'<span class="calendarSelect-everyData-add-span">'+j+'</span>'
			+ 	'<input type="hidden" class="" value="'+preYear+'/'+monthaddbeforezero+preMonth+'/'+addbeforezero+j+'"/>'
			+ '</li>').prependTo(".calendarSelect-everyData");
	    }

	    for(m = 0; m < 6 - endWeek; m++){
            addbeforezero = "";
            monthaddbeforezero = "";
            if((m+1) < 10){
                addbeforezero = "0";
            }
            if(nextMonth < 10){
                monthaddbeforezero = "0";
            }
	    	$(".calendarSelect-everyData").append('<li class="calendarSelect-on">'
			+ 	'<span class="calendarSelect-everyData-add-span">'+(m+1)+'</span>'
			+ 	'<input type="hidden" value="'+nextYear+'/'+monthaddbeforezero+nextMonth+'/'+addbeforezero+(m+1)+'"/>'
			+ '</li>');
	    }
	    changeBgColor()
    }
    //返回今天
    $(".calendarSelect-back").click(function(){
    	$(".calendarSelect-year-show").html(nowYear + "年");
    	$(".calendarSelect-year-show").val(nowYear);
    	$(".calendarSelect-month-show").html(nowMonth);
    	var backYear = $(".calendarSelect-year-show").val();
    	var backMonth = $(".calendarSelect-month-show").html();
    	getYearMonth(backYear,backMonth)
    	changeBgColor();
    })
    //改变选中的背景颜色
    function changeBgColor(){
    	$("span[name = '0']").css({color:"#fd5b5b"});
    	$("span[name = '6']").css({color:"#fd5b5b"});
    	$(".calendarSelect-everyData").find("li").each(function(){
    		$(this).click(function(){
                //返回选择的值
                // if(calendarSelect.para.resource && calendarSelect.para.resource != ""){
                //     if(calendarSelect.para.addtime == "Y"){
                //         var nowTime = new Date();
                //         var times=nowTime.getHours();
                //         if(times<10){
                //             times = "0"+times;
                //         }
                //         var minutes=nowTime.getMinutes();
                //         if(minutes<10){
                //             minutes = "0"+minutes;
                //         }
                //         var miao=nowTime.getSeconds();
                //         if(miao<10){
                //             miao = "0" + miao;
                //         }
                //         calendarSelect.para.resource.val($(this).find("input").val() + " " +times+":"+minutes+":"+miao );
                //     }else{
                //         calendarSelect.para.resource.val($(this).find("input").val());
                //     }
                //     calendarSelect.para.assisdiv.css({display:"none"});
                //     calendarSelect.para.assisdiv.find("div").html("");
                // }
    			// if($(this).attr("class") == "data-on"){
    			// 	return;
    			// }
    			$(".calendarSelect-everyData").find("li span").css({backgroundColor:"#fff",color:"#424242",fontSize:"14px"});
    			$(".calendarSelect-everyData span.calendarSelect-everyData-add-span").css({color:"#ccc"});
    			$(".calendarSelect-everyData").find("span[name='0']").css({color:"#fd5b5b"});
    			$(".calendarSelect-everyData").find("span[name='6']").css({color:"#fd5b5b"});
    			$(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"});
    		})
            //判断当前天背景变色
            addbeforezero = "";
            monthaddbeforezero = "";
            if(nowDay < 10){
                addbeforezero = "0";
            }
            if(nowMonth < 10){
                monthaddbeforezero = "0";
            }
    		if($(this).find("input").val() == nowYear+'/'+monthaddbeforezero+nowMonth+'/'+addbeforezero+nowDay){
    			$(this).find("span").css({backgroundColor:"#fd5b5b",color:"#fff",fontSize:"16px"});
    		}
    		
    	})
    }
    changeBgColor();

})