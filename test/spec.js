describe('creditCard', function() {
    // Get the fake credit card number at http://www.getcreditcardnumbers.com/

    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="cc" data-bv-creditcard />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('cc');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('accept spaces', function() {
        this._$field.val('5267 9789 9451 9654');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('accept dashes', function() {
        this._$field.val('6011-2649-6840-4521');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('invalid format', function() {
        this._$field.val('4539.1870.2954.3862');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });

    it('American Express', function() {
        this._$field.val('340653705597107');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('American Express invalid length', function() {
        this._$field.val('3744148309166730');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });

    it('American Express invalid prefix', function() {
        this._$field.val('356120148436654');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });

    it('Diners Club', function() {
        this._$field.val('30130708434187');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Diners Club (US)', function() {
        this._$field.val('5517479515603901');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Discover', function() {
        this._$field.val('6011734674929094');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('JCB', function() {
        this._$field.val('3566002020360505');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Laser', function() {
        this._$field.val('6304 9000 1774 0292 441');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Maestro', function() {
        this._$field.val('6762835098779303');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Mastercard', function() {
        this._$field.val('5303765013600904');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Solo', function() {
        this._$field.val('6334580500000000');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Visa', function() {
        this._$field.val('4929248980295542');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toBeTruthy();
    });

    it('Visa invalid check digit', function() {
        this._$field.val('4532599916257826');
        this._bs.validate();
        expect(this._bs.isValidField('cc')).toEqual(false);
    });
});

describe('isbn', function() {
    // Override the default options
    $.extend($.fn.bootstrapValidator.DEFAULT_OPTIONS, {
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        }
    });

    beforeEach(function() {
        var html = [
            '<div class="container">',
                '<form class="form-horizontal" id="form">',
                    '<div class="form-group">',
                        '<input type="text" name="isbn" data-bv-isbn />',
                    '</div>',
                '</form>',
            '</div>'
        ].join('\n');

        $(html).appendTo('body');
        $('#form').bootstrapValidator();

        this._bs     = $('#form').data('bootstrapValidator');
        this._$field = this._bs.getFieldElements('isbn');
    });

    afterEach(function() {
        $('#form').bootstrapValidator('destroy').remove();
    });

    it('isbn10 hyphen', function() {
        var samples = ['99921-58-10-7', '9971-5-0210-0', '960-425-059-0', '80-902734-1-6'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 space', function() {
        var samples = ['85 359 0277 5', '1 84356 028 3', '0 684 84328 5', '0 85131 041 9', '0 943396 04 2'];

        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 hyphen with X', function() {
        var samples = ['0-8044-2957-X', '0-9752298-0-X'];
        for (var i in samples) {
            this._$field.val(samples[i]);
            this._bs.validate();
            expect(this._bs.isValidField('isbn')).toBeTruthy();
        }
    });

    it('isbn10 invalid check digit', function() {
        this._$field.val('99921-58-10-6');
        this._bs.validate();
        expect(this._bs.isValidField('isbn')).toEqual(false);
    });

    it('isbn13', function() {
        this._$field.val('978-0-306-40615-7');
        this._bs.validate();
        expect(this._bs.isValidField('isbn')).toBeTruthy();
    });

    it('isbn13 invalid check digit', function() {
        this._$field.val('978-0-306-40615-6');
        this._bs.validate();
        expect(this._bs.isValidField('isbn')).toEqual(false);
    });
});
