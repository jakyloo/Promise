{
		

	let pb0 = new ProgressBar('ProgressBar0');	
	tools.append2Demo(pb0, 'tdR2BC2');

	let pgui0 = new PromiseGUI(1);		
	tools.prepend(pgui0.$td, pb0.$tr);	

	// ===================================================================================================== //

	let _resolve = function(result, pgui){
		window.console.promise.log.resolve(result.id);
		pgui.resolved();
	}	

	let _reject = function(result, pgui){		
		
		// ATTENTION: The exception was intercepted by the object 'Promise' 
		//            who called this function. So, now 'result' is an 'Error' 
		//            object (instead of 'result') this is potentially
		//            high harmful. (and not too much correct.)
		
		debugger;


		window.console.promise.log.reject(result.id);
		pgui.rejected();
		
		// If an exception occurs in this function, the error will be caught by 'Promise'. 
		// and sent to the function 'cath', causing the lost of the information about who, 
		// what & why, caused the chain.
		//
		// throw new Error("Now the original 'Error' is hidden by this.");
		
	}	
	
	let _finally = function(pb, pgui, btn){
		window.console.promise.log.finally(pb.id);
		pgui.fulfilled();
		
		tools.enableBtns(btn);
	}	
	
	let _catch = function(error, pb, pgui){
		window.console.promise.log.catch(error);
		pgui.catched();
	}		

	
	function btnR2BStart_onclick(btn){
		try{
			
			console.clear();			
			tools.disableBtns(btn);	
			pgui0.reset();		

				
			new Promise(function(resolve, reject) {	

				// A 'try-catch' session here is conceptually correct if we know how to instantiate an object
				// 'result' (the type used by 'reject',is  different from the type used by 'resolve'). 
				// one solution could be a factory method in the 'ProgressBar'
				//
				// 'try-catch' is commented-out for test.
				//try{
					// ============================================================================================ //

					debugger;

					// The function 'start' will trown a synchronous exception!					
					pb0.errorPercent = 100;

					// The lesson is: the function 'start' should be ALWAYS PROTECTED BY A 'TRY-CATCH' session.
					// ============================================================================================ //
					
					pb0.start(resolve, reject);				
				//}
				//catch(jse){
				//	reject(...); // see code in 'R3a.js'
				//}
			})
			.then(
				result => _resolve(result, pgui0), 
				result => _reject (result, pgui0)
			)
			.finally(() => { _finally(pb0, pgui0, btn); })
			.catch((error) => _catch(error, pb0, pgui0));
			

		}
		catch(jse){
			alert(jse.message);
		}
	}


	// ===================================================================================================== //
	
	
	function btnR2BNewPromise_onclick(btn)	{
		try{
			
			console.clear();			
			tools.disableBtns(btn);	
			pgui0.reset();
		
			new Promise(function(resolve, reject) {					
				// after this error '_reject' will receive an 'Error' object' instead of 'ProgressBar'.
				throw new Error("Synchronous error thrown to test the behavior of the application.");	
				pb0.start(resolve, reject);				
			})
			
			.then(
				result => _resolve(result, pgui0), 
				result => _reject (result, pgui0) 
			)

			.finally(() => { _finally(pb0, pgui0, btn); })
			.catch((error) => _catch(error, pb0, pgui0));

			
		}
		catch(jse){
			alert(jse.message);			
		}		
		
		
	}

}
