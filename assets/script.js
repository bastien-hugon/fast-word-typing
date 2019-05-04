/**
 * @description Main class of the project
 * @author Bastien-Hugon
 */
 
h=00;m=00;s=00; pause=1; now=0; nb_mots=0;
function date_heure() {
	now=Date.now();
	if(now-last_now>1500) { pause=1; }
	if(pause==0) { 
		s++; 		
		if(s==60) { 
			s=0;
			m++;
			push_stats();
			if(m==60) { m=0; h++; }
		}
		ss=s<10?"0"+s:s;
		mm=m<10?"0"+m:m;
		hh=h<10?"0"+h:h;
		document.getElementById('chrono').innerHTML="Total : "+hh+":"+mm+":"+ss;
	}
}
setInterval("date_heure()", 1000);

last_now=0;
addEventListener('keydown', function(event) {
	last_now=Date.now();
	pause=0;
}
);

les_minutes=0;
les_cpm=0;
les_mpm=0;
var GlobalArrayX = [];
var GlobalArrayY1 = [];
var GlobalArrayY2 = [];
function push_stats() {
	GlobalArrayX.push(les_minutes);
	GlobalArrayY1.push(les_cpm);
	GlobalArrayY2.push(les_mpm);
	les_minutes++;
	les_cpm=0;
	les_mpm=0;
	chart.update();
}

 
 
class FWT {
    constructor(data) {
        this._words = data.split('\n');
        this._index = 1;
        this._total = 0;
        this._wrong = 0;
        this._alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        this.render();
        this.start();
    }

    start() {
        const _this = this;
        
        $('#jump-form').submit((e) => {
            e.preventDefault();
            const nextIndex = this._words.indexOf($('#jump-input').val().toUpperCase());
            if (nextIndex !== -1) {
                this._index = nextIndex;
                $('#jump-input').val('');
            } else 
                alert('Word not found');
            this.render();
        })

        $('#main-form').on('input', function() {
            if ($('#main-input').val().indexOf(' ') !== -1) {
                _this.processInput();
            }
        });

        $('#main-form').submit((e) => {
            e.preventDefault();
            this.processInput();
        });
    }

    processInput() {
        const submitValue = $.trim($('#main-input').val().toUpperCase());

        if (submitValue === this._words[this._index]) {
            $('#main-input').css("background-color", "#6ab04c");
			les_cpm+=$('#main-input').val().length;	
			les_mpm++;
			nb_mots++;
			$('#nb_mots').text(nb_mots+'/65210');
			$('#main-input').val('');
			this._total++;
			this._index++;	
			this.render();
        } else {
            $('#main-input').css("background-color", "#ff7979");
            $('#main-input').val($.trim($('#main-input').val()));
        }
        // Reset css after 200ms
        setTimeout(() => {
            $('#main-input').css("background-color", "white");
        }, 200) // Change this if you want
    }

    render() {
        // Render the words
        for (let i = -3; i < 3; i++) {
            if (this._index + i >= 0)
                $('#w'+(i+3)).text(this._words[this._index + i].toLowerCase());
            else
                $('#w'+(i+3)).text('');
        }
        // Render Chapter
        for (let i = 1; i < 6; i++)
            $('#l' + i).text('');
        for (let i = -3; i < 3; i++) {
            const lIndex = this._alpha.indexOf(this._words[this._index].split('')[0])
            if (this._alpha[lIndex + i]) {
                $('#l' + (i + 3)).text(this._alpha[lIndex + i]);
                if (this._alpha[lIndex] == this._alpha[lIndex + i])
                    $('#l' + (i + 3)).css('background-color', 'grey')
                else if (lIndex > lIndex + i)
                    $('#l' + (i + 3)).css('color', '#6ab04c')
            }
        }
    }
}