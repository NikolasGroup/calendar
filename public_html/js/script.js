(function(){
    $(document).ready(function(){
        var today = new Date(),
            thisMonth = today.getMonth(),
            thisYear = today.getFullYear(),
            thisMonthText = getMonthText(thisMonth);
          
        $('#monthName').text(thisMonthText + ' ' + thisYear);
        
        var prevMonth = thisMonth,
            prevMonthYear = thisYear;            
        if(thisMonth === 0){
            prevMonth = 12;
            prevMonthYear = thisYear - 1;
        }
        
        var nextMonth = thisMonth + 2,
            nextMonthYear = thisYear;
        if(thisMonth === 11){
            nextMonth = 1;
            nextMonthYear = thisYear + 1;
        }
        
        var firstDayWeek = new Date(thisYear, thisMonth, 1).getDay();
        if(firstDayWeek === 0)
            firstDayWeek = 7;
        
        var nextMonth = new Date(thisYear , thisMonth+1, 0).getDate(),
            lastDay = new Date(thisYear,thisMonth,nextMonth).getDate(),
            lastDayWeek = new Date(thisYear,thisMonth,nextMonth).getDay();
        if(lastDayWeek === 0)
            lastDayWeek = 7;
        
        var thisMonth = new Date(thisYear , thisMonth, 0).getDate(),
            lastDayPrev = new Date(thisYear,thisMonth-1,thisMonth).getDate();
        
        var prevMonthDayCount = firstDayWeek - 1;
       
        for(var i = lastDayPrev - prevMonthDayCount; i < lastDayPrev; i++){
            var day = i+1;
            if(day<10){
                day = '0' + day;
            }
            var month = prevMonth;
            if(month<10){
                month = '0' + month;
            }
            $('.calendar_bottom__body').append('<div class="day" data-date="'+day+'.'+month+'.'+prevMonthYear+'"><span class="day__date">'+(i+1)+'</span></div>');
        }
        
        for(var i = 0; i < lastDay; i++){
            var day = i+1;
            if(day<10){
                day = '0' + day;
            }
            var month = prevMonth + 1;
            if(month<10){
                month = '0' + month;
            }
            $('.calendar_bottom__body').append('<div class="day" data-date="'+day+'.'+month+'.'+thisYear+'"><span class="day__date">'+(i+1)+'</span></div>');
        }
        
        for(var i = 0; i < 7 - lastDayWeek; i++){
            var day = i+1;
            if(day<10){
                day = '0' + day;
            }
            var month = nextMonth;
            if(month<10){
                month = '0' + month;
            }
            $('.calendar_bottom__body').append('<div class="day" data-date="'+day+'.'+month+'.'+nextMonthYear+'"><span class="day__date">'+(i+1)+'</span></div>');
        }
        
        $('.calendar_bottom__body').find('.day:nth-child('+1+')').find('span').prepend('Понедельник, ');
        $('.calendar_bottom__body').find('.day:nth-child('+2+')').find('span').prepend('Вторник, ');
        $('.calendar_bottom__body').find('.day:nth-child('+3+')').find('span').prepend('Среда, ');
        $('.calendar_bottom__body').find('.day:nth-child('+4+')').find('span').prepend('Четверг, ');
        $('.calendar_bottom__body').find('.day:nth-child('+5+')').find('span').prepend('Пятница, ');
        $('.calendar_bottom__body').find('.day:nth-child('+6+')').find('span').prepend('Суббота, ');
        $('.calendar_bottom__body').find('.day:nth-child('+7+')').find('span').prepend('Воскресенье, ');

        $('.calendar_bottom__body').find('.day[data-date="'+today.getDate()+'.'+(prevMonth+1)+'.'+thisYear+'"]').addClass('today');
    
        $('body').on('click','.day',function(){            
            createForm(this);                        
        });
        
        $('body').on('click','#closeForm',function(){            
            $('#addForm').remove();
            $('.day').removeClass('open');
            $('#addForm_quick').remove();
            return false;
        });
        
        $('.quicklyAdd').on('click',function(){
            createQuickForm();
        });
    });
})();

function getMonthText(a){
    switch(a){
        case 0:
            return 'Январь';
        case 1:
            return 'Февраль';
        case 2:
            return 'Март';
        case 3:
            return 'Апрель';
        case 4:
            return 'Май';
        case 5:
            return 'Июнь';
        case 6:
            return 'Июль';
        case 7:
            return 'Август';
        case 8:
            return 'Сентябрь';
        case 9:
            return 'Октябрь';
        case 10:
            return 'Ноябрь';
        case 11:
            return 'Декабрь';
    }
}

function createForm(a){
    var $this = $(a);
    
    if($this.hasClass('open')){
        return false;
    }
    
    $('#addForm').remove();
    $('.day').removeClass('open');
    $('#addForm_quick').remove();
    
    $this.addClass('open');
    
    var top = $this.position().top,
        left = $this.position().left;
    
    var width = $this.parent().width();    
    var positionLeft = left + 317;
    
    var height = $this.parent().height();
    var positionTop = top + 307;
    
    var leftRight = 'left';
    if(positionLeft > width){
        leftRight = 'right';
    }
    
    var topBottom = 'bottom';
    if(positionTop > height){
        topBottom = 'top';
    }
    
    if($this.hasClass('day_event')){
        editEvent($this,leftRight,topBottom); 
    }
    else{
        newEvent($this,leftRight,topBottom); 
    } 
    
    
}
function newEvent(a,leftRight,topBottom){
    var $this = a;
    
    var form = '<form id="addForm" class="'+leftRight+' '+topBottom+'">\n\
                    <a id="closeForm"></a>\n\
                    <input type="text" name="nameEvent" placeholder="Событие">\n\
                    <input type="text" name="dateEvent">\n\
                    <input type="text" name="personsEvent" placeholder="Имена участников">\n\
                    <textarea placeholder="Описание"></textarea>\n\
                    <button onclick="addEvent(this);return false;">Готово</button><button onclick="delEvent(this);return false;">Удалить</button>\n\
                </form>';
    
    $this.append(form);
    
    $('input[name=dateEvent]').mask("99.99.9999").val($this.data('date'));
}
function editEvent(a,leftRight,topBottom){
    var $this = a;
    var name = $this.find('.event__name').text();
    var person = $this.find('.event__person').text();
    var description = $this.find('.event__description').text();
    var date = $this.data('date');
    date = date.split('.');
    var monthText = getMonthText(parseInt(date[1]));
    
    var form = '<form id="addForm" class="'+leftRight+' '+topBottom+'">\n\
                    <a id="closeForm"></a>\n\
                    <p class="nameEvent">'+name+'</p>\n\
                    <p class="dateEvent">'+parseInt(date[0])+' '+monthText+'</p>\n\
                    <p class="personsEvent"><span>Участники:</span>'+person+'</p>\n\
                    <textarea placeholder="Описание">'+description+'</textarea>\n\
                    <button onclick="editDiscriptionEvent(this);return false;">Готово</button><button onclick="delEvent(this);return false;">Удалить</button>\n\
                </form>';
    
    $this.append(form);
}
function addEvent(a){
    var $form = $(a).closest('form');
    if( $form.find('input[name=nameEvent]').val() == '' ){
        $form.find('input[name=nameEvent]').addClass('error');
        return false;
    }
    var event = '<div class="event">\n\
                    <p class="event__name">'+$form.find('input[name=nameEvent]').val()+'</p>\n\
                    <p class="event__person">'+$form.find('input[name=personsEvent]').val()+'</p>\n\
                    <p class="event__description">'+$form.find('textarea').val()+'</p>\n\
                </div>';
    
    var date = $form.find('input[name=dateEvent]').val();
    
    $('.calendar_bottom__body').find('.day[data-date="'+date+'"]').addClass('day_event').append(event);
    
    $('#addForm').remove();
    $('.day').removeClass('open');
    $('#addForm_quick').remove();
    return false;
}
function delEvent(a){
    var $form = $(a).closest('form');
    var date = $form.find('input[name=dateEvent]').val();
    if(date == undefined){
        date = $form.closest('.day').data('date');
    }
    $('.calendar_bottom__body').find('.day[data-date="'+date+'"]').removeClass('day_event').find('.event').remove();
    
    $('#addForm').remove();
    $('.day').removeClass('open');
    $('#addForm_quick').remove();
    return false;
}

function createQuickForm(){
    $('#addForm').remove();
    $('.day').removeClass('open');
    $('#addForm_quick').remove();
    
    var form = '<form id="addForm_quick">\n\
                    <a id="closeForm"></a>\n\
                    <input type="text" name="quicEvent" placeholder="01.03, День рождения">\n\
                    <button onclick="addQuickEvent(this);return false;">Создать</button>\n\
                </form>';
    
    $('.calendar_top__button').append(form);
}
function addQuickEvent(a){
    var $form = $(a).closest('form');
    
    var text = $form.find('input').val();
    text = text.split(',');
    
    var date = text[0];
    var name = text[1];

    if(date == undefined || name == undefined){
        $form.find('input').addClass('error').after('<span class="error_msg">Формат ввода должен быть: 01.01, Название события</span>');
        return false;
    }
    var today = new Date(),
        thisYear = today.getFullYear();
    date = date + '.' + thisYear;

    var event = '<div class="event">\n\
                    <p class="event__name">'+name+'</p>\n\
                    <p class="event__person"></p>\n\
                    <p class="event__description"></p>\n\
                </div>';
    
    $('.calendar_bottom__body').find('.day[data-date="'+date+'"]').addClass('day_event').append(event);
    
    $('#addForm_quick').remove();
}