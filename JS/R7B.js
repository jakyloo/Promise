




{
	// The number of 'ProgressBar'	
	let n = 5;
		
	// the arrays with the ProgressBars and the ProgressGUI
	let pbs   = [];
	let pguis = [];	
		
	for(let i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);	
		pbs[i].resolvePercent = 50;
		pbs[i].errorPercent   =  0;
		pbs[i].interval       = 15;
		pbs[i].isSynchronous  = false;
		
		tools.append2Demo(pbs[i], 'tdR7BC2');

		// The ProgressGUI associated with each of the progressBar
		// The parameter '1' is the 'rowspan'
		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);	
		
		tools.prependTdCounter(pbs[i].$tr);	
	}
		
	// this is the 'PromiseGUI' associated with the 'Mastre-Promise'. It spanns n rows.
	let pguiAll = new PromiseGUI(n);
	tools.prepend(pguiAll.$td, pbs[0].$tr);	
	
	// ======================================================= //
	// A DIY Promise!
	let counter = 0;
	let _done = function(_pb){
		
		
		
		tools.showCounter(_pb.$tr, ++counter);
		
		// 
		masterPromise = masterPromise || Promise.all(promises);
		
		
		// debugger
		if (counter == 1){	
			// masterPromise must be created, at the latest, immediately before the process completing the first one
			// this ensures 'Promise' still works correctly, despite this strange 'three steps' configuration.
			// This proves the necessity to call 'Promise.all' before the job for 'PromiseAll' starts.
			masterPromise = Promise.all(promises);			
			tools.enableBtn($('#btnR7BThen'));
		}		
		
		if (counter == n){	
			counter = 0;
		}
	}	
	// ======================================================= //
	
	tools.disableBtn($('#btnR7BAll'));;
	tools.disableBtn($('#btnR7BThen'));

	
	let masterPromise = null;
	let promises = [];
	
	function btnR7BNewPromise_onclick(btn){	
		
		//debugger;	
		
		tools.clearCounters(btn);
		
		console.clear();
		tools.highlight.clear(btn);
		tools.disableBtn($('#btnR7BThen'));
		tools.disableBtn($('#btnR7BRace'));
		tools.reset(pguis);
		pguiAll.reset();
		
		
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
			
			
		// can be procastinated just after the first resolve/reject occurs (see function '_done')
		// masterPromise = Promise.all(promises);
	
	}
			

	function btnR7BThen_onclick(btn){

		let $btnR7BNewPromise = $('#btnR7BNewPromise');
		
		//masterPromise = Promise.all(promises);
		
		// Allways the 'ProgressBar' number 1 should be selected if things runs correctly.
		masterPromise.then(folder => R4A.resolve(pguiAll, folder, $btnR7BNewPromise),
			folder => R4A.reject (pguiAll, folder, $btnR7BNewPromise)
		)
		.finally(() => { 
			R4A.finally(pguiAll, $btnR7BNewPromise); 
			tools.disableBtn(btn);
			tools.disableBtn($('#btnR7BAll'));
		})
		.catch((error) => R4A.catch(error, pguiAll, $btnR7BNewPromise));		
	}

}
