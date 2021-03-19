
//let R6A = {};

{
	let n = 1;
	let counter = 100;
		
	let pbs   = [];
	let pguis = [];	
	
	for(i = 0; i < n; i++){

		pbs[i] = new ProgressBar('ProgressBar' + i);

		pbs[i].resolvePercent =  60;
		pbs[i].errorPercent   =  20;		
	
		tools.append2Demo(pbs[i], 'tdR7AC2');
		
		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);	
	}	

	


	function btnR7AThenA_onclick(btn){
		start(isSynchronous = false, btn);
	}

	
	function btnR7AThenS_onclick(btn){
		start(isSynchronous = true, btn)
	}
	


	function start(isSynchronous, btn){	
		
		console.clear();
		tools.disableBtns(btn);
		tools.reset(pguis);		

		debugger;
		
		for(let i = 0; i < n; i++){		
				
				// closure needs to be managed in that way, in a 'for loop'
				let pb   = pbs[i];
				let pgui = pguis[i];
				
				pb.isSynchronous  = isSynchronous;

				
				let promise = new Promise(function(resolve, reject) {
					try{
						
						// 'resolve' and 'reject' can have ONLY ONE PARAMETER.
						// 'folder' wraps 3 parameters in only one.						
						
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
				});
				
				// when 'isSynchronous' = 'true' the code below runs only after all the functions 'start' completed.
				
				promise.then(
					result => R3A.resolve(result, pb), 
					result => R3A.reject(result, pb)
				)
				.finally(()    => R3A.finally(pb, pgui, btn))
				.catch((error) => R3A.catch(error, pb, pgui));
		}		

	}
	
	// ********************************************************* //
/*	
	let _resolve = function(result, pb){
		window.console.promise.log.resolve(pb.id);
		tools.showCounter(pb.$tr, ++counter);
	}	
	
	let _reject = function(result, pb){
		window.console.promise.log.reject(pb.id);
		tools.showCounter(pb.$tr, ++counter);
	}

	let _finally = function(pguiAll, btn){
		window.console.promise.log.finally();			
		tools.enableBtns(btn);
		pguiAll.fulfilled();
	}	

	let _catch = function(error, pguiAll){
		window.console.promise.log.catch(error);			
	}	
	*/	
		
}