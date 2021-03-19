{

	
	let n = 5;
		
	// the array with the progress bars
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);	
		pbs[i].resolvePercent = 40;
		pbs[i].errorPercent   = 0;
		tools.append2Demo(pbs[i], 'tdR4BC2');	
		
		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);
	}
		
	let pguiAllSettled = new PromiseGUI(n);
	tools.prepend(pguiAllSettled.$td, pbs[0].$tr);
	
	function btnR4BAllSettled_onclick(btn){
		
		console.clear();
		tools.disableBtns(btn);
		tools.highlight.clear(btn);		
		tools.reset(pguis);
		pguiAllSettled.reset();		
		
		let promises = [];

		debugger;
		
		for(let i = 0; i < pbs.length; i++){
			
			// closure needs to be managed in that way, in a 'for loop'		
			let pb   = pbs[i];			
			let pgui = pguis[i];
			
			// every promise is configurated to manage its own 'ProgressBar'
			promises[i] = new Promise(function(resolve, reject) {
				
				try{
					
					let _resolve = function(result){ 
						let folder = {result: result, pgui: pgui};	
						resolve(folder);
					}

					let _reject = function(result){ 
						let folder = {result: result, pgui: pgui};		
						reject(folder);
					}
					
					pb.start(_resolve, _reject);
					
				}
				catch(jse){
					window.console.promise.log.catch(jse);
						
					let rejectionResult = pb.getRejectionResult(jse);
					let folder = {result: rejectionResult, pgui: pgui};	
						
					// this ensures '_reject' will always receive the correct 
					// type parameter, and all the info it needs.
					reject(folder);
				}
			})
			
			tools.highlight.resolved(btn);
		}
		
				
		// Now the new promise does not controls the progressBar, instead it controls an array 
		// of 'promises' like an orchestra conductor. 
		// Despite, something new happens, what we have is always a 'promise' and know how to manage it.
		let promiseAlllSettled = Promise.allSettled(promises);
		
		// and now we can use the 'promise' in the way we learn 
		promiseAlllSettled.then(
			items  => resolveAllSettled(items, pguiAllSettled), 
			folder => rejectAlllSettled(folder, pguiAllSettled)
		)
		.finally(() => { finallyAllSettled(pguiAllSettled, btn); })
		.catch((error) => catchAllSettled(error, pguiAllSettled, btn));

	
	}

		

	let resolveAllSettled = function(items, pgui){		
		
			items.forEach(item => {
				("value"  in item) ? item.value.pgui.resolved():
				("reason" in item) ? item.reason.pgui.rejected():	
				alert('Unknown result.');
				
				(item.value || item.reason).pgui.fulfilled();
			});
			
			// this is the 'master' 'Promise'
			pgui.resolved();		
	}	


	// ------------------------------------------------------------ //
	// Seems that 'alllSettled' never rejects.
	let rejectAlllSettled = function(folder, pgui){

		folder.pb.rejected();
		folder.pb.fulfilled();
		window.console.promise.log.reject(folder.result.id);
		
		tools.stop(pbs);
		pgui.rejected();		
	}	
	// ------------------------------------------------------------ //

	
	let finallyAllSettled = function(pgui, btn){
		window.console.promise.log.finally();
		pgui.fulfilled();		
		tools.enableBtns(btn);
	}	


	let catchAllSettled = function(error, pgui, btn){
		window.console.promise.log.catch(error);
		pgui.catched();		
		tools.highlight.rejected(btn);				
	}
		
}