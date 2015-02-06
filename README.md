jquery-phone-brazil
===================

Jquery mask phone brazil.

por @palloi - palloi.hofmann@gmail.com - CSSforHTML - 20-06-2012 - http://css4html.com.br
@versão: 1.0.2

Plugin para novo formato de telefone.
Valida telefones com os seguintes formatos:
- (99) 9999-9999
- (99) 99999-9999

Como usar: 
   html    :<input type="text" id="id_phone" name="phone" /> || <input type="text" class="class-phone" name="phone" /> || <input type="text" name="phone" />
   script  :sempre setar dentro do ready exemplo:
         $(document).ready(function(){ 
           $('#id_phone').phoneBrazil();                         || $('.class-phone').phoneBrazil();                           || $('input[name=phone]').phoneBrazil();
         });

 Depois de fazer a chamada, automaticamente irá inserir a máscara no input ou div, span, etc...

Modificações:
versão 1.0.2:
-Adicionando a propriedade 'value': tem como função retornar o valor com a mascara. Para utiliziar basta aplicar $.fn.phoneBrazil({value: "1188889999"});
-Adicionando a propriedade 'isInput': tem como função aplicar a mascara em um elemento direfente de input. Por padrão é 'true' e pode ser aplicado $('div').phoneBrazil({isInput: false});

Modificações:
versão 1.0.1:
-Adicionando a propriedade 'enable': tem como função remover as funções e maxlength aplicados no campo. Por padrão é 'true' e pode ser aplicado $('...').phoneBrazil({enable: false});

versão 1.0.0:
-inicio do plugin.
