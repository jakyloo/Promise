{
		
	let pb0 = new ProgressBar('ProgressBar0');	
	tools.append2Demo(pb0, 'tdR2DC2');	

	let pgui0 = new PromiseGUI(1);		
	tools.prepend(pgui0.$td, pb0.$tr);	
	
	
	let _resolve = function(result, pgui){
		window.console.promise.log.resolve(result.id);
		pgui.resolved();	
	}	

	
	let _reject = function(result, pgui){
		window.console.promise.log.reject(result.id);
		pgui.rejected();
	}	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	let _finally = function(pb, pgui, btn){
		window.console.promise.log.finally(pb.id);
		pgui.fulfilled();
		
		tools.enableBtns(btn);
			
		debugger;
		
		// this exception will cause a call to '_catch'	
		//(simulate an uncaught exception in this function.)
		throw new Error("Synchronous error thrown randomly to test the application.");
		
	}	
	
	let _catch = function(error, pb, pgui, btn){
		window.console.promise.log.catch(error);
		pgui.catched();
	}	
	
	function btnR2DFinally_onclick(btn){
		try{
			
			pgui0.reset();
			console.clear();				
			tools.disableBtns(btn);		
			
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
			.catch((error) => _catch(error, pb0, pgui0, btn));

		}
		catch(jse){
			alert(jse.message);
		}	
	}
}

