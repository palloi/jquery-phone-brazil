// por @palloi - palloi.hofmann@gmail.com - CSSforHTML - 20-06-2012 - http://css4html.com.br
// @versão: 1.0.2
//
// Plugin para novo formato de telefone.
// Valida telefones com os seguintes formatos:
// - (99) 9999-9999
// - (99) 99999-9999
//
// Como usar: 
//   html    :<input type="text" id="id_phone" name="phone" /> || <input type="text" class="class-phone" name="phone" /> || <input type="text" name="phone" />
//   script  :sempre setar dentro do ready exemplo:
//         $(document).ready(function(){ 
//           $('#id_phone').phoneBrazil();                         || $('.class-phone').phoneBrazil();                           || $('input[name=phone]').phoneBrazil();
//         });
//
// Depois de fazer a chamada, automaticamente irá inserir a máscara no input ou div, span, etc...
//
// Modificações:
//versão 1.0.2:
// -Adicionando a propriedade 'value': tem como função retornar o valor com a mascara. Para utiliziar basta aplicar $.fn.phoneBrazil({value: "1188889999"});
// -Adicionando a propriedade 'isInput': tem como função aplicar a mascara em um elemento direfente de input. Por padrão é 'true' e pode ser aplicado $('div').phoneBrazil({isInput: false});
//
// Modificações:
//versão 1.0.1:
// -Adicionando a propriedade 'enable': tem como função remover as funções e maxlength aplicados no campo. Por padrão é 'true' e pode ser aplicado $('...').phoneBrazil({enable: false});
//
//versão 1.0.0:
// -inicio do plugin.

$.fn.extend({
    //Helper Function for Caret positioning
    caret: function(begin, end) {
      if (this.length == 0) return;
      if (typeof begin == 'number') {
        end = (typeof end == 'number') ? end : begin;
        return this.each(function() {
          if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(begin, end);
          } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', begin);
            range.select();
          }
        });
      } else {
        if (this[0].setSelectionRange) {
          begin = this[0].selectionStart;
          end = this[0].selectionEnd;
        } else if (document.selection && document.selection.createRange) {
          var range = document.selection.createRange();
          begin = 0 - range.duplicate().moveStart('character', -100000);
          end = begin + range.text.length;
        }
        return { begin: begin, end: end };
      }
    }
});

$.fn.phoneBrazil = function (_options) {
  var defaults = {
    value: "",
    isInput: true,
    intervalMask: null,
    enable: true,

    keyup: function (event) {
      clearTimeout(options.intervalMask);
      var _caret = $(this).caret().end;

      if(event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 16 || event.keyCode == 8 || event.keyCode == 46) {
        if(event.keyCode == 8)
          if($(this).caret().end == 14)
            options.mask($(this));
        return false;
      }
      
      options.mask($(this), _caret);
    },

    blur: function(){
      options.mask($(this));
    },

    mask: function(e, _caret){
      var _value = "";
      var _trace = "";

      if(options.value != "")
        _value = options.value;
      else if(options.isInput)
        _value = e.val();
      else
        _value = e.text();

      _value = _value.replace(/\D/g, "").substr(0,11);

      if(_caret != undefined) {
        options.intervalMask = setTimeout(function(){
          _trace = /(\d{4})(\d)/;
          
          if(_value.length > 10)
            _trace = /(\d{5})(\d)/;
          
          _value = _value.replace(/^(\d\d)(\d)/g, "($1) $2");
          
          if(_value.length < 8)
            _caret =_caret + 3;
          
          _value = _value.replace(_trace, "$1-$2");
          
          if(_value.length == 11)
            _caret =_caret + 1;
          
          if(_value.length == 12)
            _caret =_caret + 1;

            e.val(_value).caret(_caret, _caret);
        }, 10);
      } else {
        _trace = /(\d{4})(\d)/;
        
        if(_value.length > 10)
          _trace = /(\d{5})(\d)/;
          
        _value = _value.replace(/^(\d\d)(\d)/g, "($1) $2");
        _value = _value.replace(_trace, "$1-$2");

        if(options.value != "")
          return _value;
        else if(options.isInput)
          e.val(_value);
        else
          e.text(_value);
      }
    }
  };

  var options = $.extend(defaults, _options);

  if(options.value != ""){
    return options.mask(options.value);
  } else {
    return this.each(function () {
      if(options.isInput){
        if(options.enable) {
          $(this).on({
            keyup: options.keyup,
            blur: options.blur
          }).attr('maxlength', '15');
          
          options.mask($(this));
        } else {
          $(this).off().removeAttr('maxlength');
        }
      } else {
        options.mask($(this));
      }
    });
  }
};