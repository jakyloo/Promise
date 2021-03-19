
	// Some simple text formatting
		
	(()=> {

		let pb = {log: {}};		
		
		pb.log.start = function (text){
			let css = 'color:#aaaaaa;'
			pb._log('start', text, css);
		}
		
		pb.log.resolve = function (text){
			let css = 'color:#44CD5A;'
			pb._log('resolve', text, css);
		}
		
		pb.log.reject = function (text){
			let css = 'color:#FF0000;'
			pb._log('reject', text, css);
		}
		
		pb.log.catch = function (text){
			let css = 'color:#FF0000;'
			pb._log('catch', text, css);
		}		
		
		pb._log = function(action, text, css){
			_log('pb-' + action, text, css, '#transparent');
		}
		
		window.console.pb = pb;
		
		// =========================================================================================== //
		
		
		let promise = {log: {}};
		
		promise.log.resolve = function(text){	
			promise._log('resolve', text , '', '#44CD5A' );
		}
		
		promise.log.reject = function(text){	
			promise._log('reject', text, '', '#FF0000');
		}
		
		promise.log.finally = function(text){	
			let css = 'border-right:solid 9px #F8F413;'
			promise._log('fulfill', text, css, '#F8F413');
		}
		
		promise.log.catch = function(error){	
			let css = 'color:red'
			promise._log('catch', error.message, css, '#FF0000');
		}	
		
		promise._log = function(action, text, css, borderColor){
			_log('promise-' + action, text, css, borderColor);
		}

		window.console.promise = promise;
		
		// =========================================================================================== //		

		var _message = function(action, text){;
			let space = text == '' ? '' : ' - ';
			
			return action + space + text;
		}		
		
		var _log = function(action, text, css, borderColor){
			
			 // prevents the text 'undefined' is shown.
			text = text || '';
			css = 'padding: 2px 10px 2px 10px;border:solid 2px ' + borderColor + ';' + css;
			let message  = _message(action, text);
			window.console.log('%c' + message, css);
		}

		
	})();