

{
	
	let n = 5;
		
	// the array with the progress bars
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);	
		
		pbs[i].resolvePercent = 50;
		pbs[i].errorPercent   =  0;
		pbs[i].interval       = 30;
		
		tools.append2Demo(pbs[i], 'tdR7CC2');

		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);	
			
		tools.prependTdCounter(pbs[i].$tr);	
	}
		
	
	let pguiRace = new PromiseGUI(n);
	tools.prepend(pguiRace.$td, pbs[0].$tr);	
	
	// ======================================================= //
	// A DIY Promise!
	let counter = 0;
	let _done = function(_pb){
	
		tools.showCounter(_pb.$tr, ++counter);
		//masterPromise = masterPromise || Promise.race(promises);
		//tools.enableBtn($('#btnR7CThen'));
		

		// debugger
		if (counter == 1){	
			// this ensures 'Promise' still works correctly.
			masterPromise = Promise.race(promises);			
			tools.enableBtn($('#btnR7CThen'));
		}
			
		
		if (counter == n){	
			counter = 0;
			tools.enableBtn($('#btnR7CThen'));
		}	
	}	
	// ======================================================= //
	
	tools.disableBtn($('#btnR7CThen'));
	tools.disableBtn($('#btnR7CRace'));
	
	let masterPromise = null;
	let promises = [];
	
	function btnR7CNewPromise_onclick(btn){	
		
		debugger;	
		
		tools.clearCounters(btn)
		
		console.clear();
		tools.highlight.clear(btn);
		tools.disableBtn($('#btnR7CThen'));
		tools.disableBtn($('#btnR7CRace'));
		tools.reset(pguis);
		pguiRace.reset();
		
		
		//let promises = [];
		
		for(let i = 0; i < pbs.length; i++){
			
			// closure needs to be managed in that way, in a 'for loop'
			let pb     = pbs[i];	
			let pgui   = pguis[i];					
			
			// every promise is configurated to manage its own 'ProgressBar'
			promises[i] = new Promise(function(resolve, reject) {
				try{

					let _resolve = function(result){
						_done(pb);
						let folder = {result: result, pgui: pgui};
						resolve(folder);
					}

					let _reject = function(result){
						_done(pb);
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
			});
		}
						
		// can be defered till the first resolve/reject occurs
		// masterPromise = Promise.race(promises);
	
	}

	function btnR7CRace_onclick(btn){}
			

	function btnR7CThen_onclick(btn){

		let $btnR7CNewPromise = $('#btnR7CNewPromise');
		
		// The 'ProgressBar' number 1 should be selected if things runs correctly.
		masterPromise.then(
			folder => R4C.resolve(pguiRace, folder, $btnR7CNewPromise),
			folder => R4C.reject (pguiRace, folder, $btnR7CNewPromise)
		)
		.finally(() => { 
			R4C.finally(pguiRace, $btnR7CNewPromise); 
			tools.disableBtn(btn);
			tools.disableBtn($('#btnR7CRace'));
		})
		.catch((error) => R4C.catch(error, pguiRace, $btnR7CNewPromise));		
	}

}
