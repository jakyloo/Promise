{

	let pb0 = new ProgressBar('ProgressBar0');	
	tools.append2Demo(pb0, 'tdR2CC2');

	let pgui0 = new PromiseGUI(1);		
	tools.prepend(pgui0.$td, pb0.$tr);	

	
	let _resolve = function(result, pgui){		
		window.console.promise.log.resolve(result.id);
		pgui.resolved();
		
		debugger;
		
		// this exception will call '_catch' (simulate an uncaught exception in this function.)
		throw new Error("Synchronous error thrown randomly to test the application.");	
	}	

	
	let _reject = function(result, pgui){
		
		// ATTENTION: in some condition (see Section 2B) 'result' can be an 'Error object' 
		//            instead of a 'ProgressBar'.		
		
		window.console.promise.log.reject(result.id);		
		pgui.rejected();
		
		debugger;
				
		// this exception is intercepted by 'Promise' and 'catch' is called.
		// (simulation of an uncaught exception.)
		throw new Error("Synchronous error thrown randomly to test the application.");		

	}	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	let _finally = function(pb, pgui, btn){
		window.console.promise.log.finally(pb.id);
		pgui.fulfilled();
				
		tools.enableBtns(btn);
	}	
	
	let _catch = function(error, pb, pgui){
		window.console.promise.log.catch(error);
		pgui.catched();
	}	

	
	function btnR2CResolve_onclick(btn){
		try{
			
			console.clear();	
			
			tools.disableBtns(btn);	
			pgui0.reset();			
			
			
			let promise = new Promise(function(resolve, reject) {	
				
				// The function 'start' will always 'resolve'!
				pb0.resolvePercent = 100;	
												
				pb0.start(resolve, reject);
			});
			
			promise
			.then(
				result => _resolve(result, pgui0), 
				result => _reject(result, pgui0)
			)
			.finally(() => { _finally(pb0, pgui0, btn); })
			.catch((error) => _catch(error, pb0, pgui0));
			
		}
		catch(jse){
			alert(jse.message);
		}	
	}

	function btnR2CReject_onclick(btn){
		try{
			
			console.clear();				
			tools.disableBtns(btn);	
			pgui0.reset();
			
			let promise = new Promise(function(resolve, reject) {	
				
				// The function 'start' will always 'reject'!
				pb0.resolvePercent = 0;	
				pb0.errorPercent = 10;
				
				pb0.start(resolve, reject);
			});
			
			promise
			.then(
				result => _resolve(result, pgui0), 
				result => _reject(result, pgui0)
			)
			.finally(() => { _finally(pb0, pgui0, btn); })
			.catch((error) => _catch(error, pb0, pgui0));

		}
		catch(jse){
			alert(jse.message);
		}	
	}

}

/*
promise
.then(
	_resolve, 
	_reject
)
.finally(() => { _finally(_pb); })
.catch((error) => _catch(error, pb));
*/

// ========================================================================================= //
// Despite the code using the 'promise' is commented out, the 'progessBar' still runs.
// That proves:
//
// 1) A promise is a 'two stages' process. the instantiation and the use.
//
// 2) When a new 'Promise' is instanciated with 'new Promise(function(resolve, reject)'
//    The two callbacks 'resolve' & 'reject' are 'internal functions provided by the
//    'constructor' and NOT THE CALLBACKS PROVIDED BY THE DEVELOPER.
//    that's why I think the constructor should be developed in that way:
//
//    let promise = new Promise(pb.start);
//
//    - less verbose
//    - hides confusing details
// ========================================================================================= //