/**
 * @description Main class of the project
 * @author Bastien-Hugon
 */
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
                $('#jump-input').val('')
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
        } else {
            $('#main-input').css("background-color", "#ff7979");
            this._wrong++;
        }

        $('#main-input').val('')
        this._total++;
        this._index++;
        this.render();

        // Reset css after 200ms
        setTimeout(() => {
            $('#main-input').css("background-color", "white");
        }, 200) // Change this if you want
    }

    render() {
        // Render the words
        for (let i = -3; i < 3; i++) {
            if (this._index + i >= 0)
                $('#w'+(i+3)).text(this._words[this._index + i]);
            else
                $('#w'+(i+3)).text('');
        }

        // Render Score
        $('#score').text('Wrongs: ' + this._wrong + '/' + this._total);

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