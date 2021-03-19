



	/*
	// Initialization of the progress bar
	let pbA = new ProgressBar('ProgressBarA');	
	let pbB = new ProgressBar('ProgressBarB');
	
	let tdId = 'tdR5AC2';
	
	tools.append(pbA, tdId);
	tools.append(pbB, tdId);
	*/
	
	
	let n = 5;	
	
	// the array with the progress bars
	let pbs   = [];
	let pguis = [];	
		
	// Initialization of the progress bars 
	for(i = 0; i < n; i++){
		pbs[i] = new ProgressBar('ProgressBar' + i);	
		
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
		// 'tuning' of the progressBar 
		pbs[i].resolvePercent =  80;
		pbs[i].errorPercent   =  10;
		pbs[i].interval       =  10;
		// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
		tools.append2Demo(pbs[i], 'tdR5AC2');		
		
		
		pguis[i] = new PromiseGUI(1);		
		tools.prepend(pguis[i].$td, pbs[i].$tr);	
	}

	
	// https://hackernoon.com/should-i-use-promises-or-async-await-126ab5c98789
	// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
	
	let _resolve = function(folder){	
		window.console.promise.log.resolve(folder.id);
		folder.pgui.resolved();
	}	
		
	let _reject = function(folder){
		window.console.promise.log.reject(folder.id);
		folder.pgui.rejected();
	}

	let _finally = function(pb, pgui){
		window.console.promise.log.finally(pb.id);
		window.console.log(pb.id);
		pgui.fulfilled();
	}
	
	let _catch = function(error, pb, pgui){
		window.console.promise.log.catch(error);
		pgui.catched();
	}
	
	let run = async function (btn){	
		
/*		
		await new Promise(function(resolve, reject){
						
			let __resolve = function(result){
				let folder = {result: result, pgui: pguis[0]};
				resolve(folder);				
			}
			
			let __reject = function(result){
				let folder = {result: result, pgui: pguis[0]};	
				reject(folder);				
			}
			
			pbs[0].start(__resolve, __reject)
		})
		.then(
			_resolve, 
			_reject
		)
		.finally(() => { _finally(pbs[0], pguis[0]);} )
		.catch((error) => _catch(error, pbs[0], pguis[0]));
*/

		
		// Now an alternative way to do the same things.		
		
		for(index = 0; index < pbs.length; index++){

			let pb = pbs[index];
			let pgui = pguis[index];

			await new Promise(function(resolve, reject){
						
				let __resolve = function(result){
					let folder = {result: result, pgui: pguis[index]};
					resolve(folder);				
				}
				
				let __reject = function(result){
					let folder = {result: result, pgui: pguis[index]};	
					reject(folder);				
				}
				
				pbs[index].start(__resolve, __reject);
				
			})
			.then(
				_resolve, 
				_reject
			)
			.finally(()    => _finally(pb, pgui) )
			.catch((error) => _catch(error, pb, pgui));
		}
		

		// --------------------------------------------------------------------------- //
		// now progressBar behave synchronously and the following line will
		// be executed only after progress bar completed, as if it was a
		// synchronous process.
		tools.enableBtns(btn);	
		// --------------------------------------------------------------------------- //	

		tools.highlight.resolved(btn);
			
	} 
	
	function btnR5AStart_onclick(btn){
		debugger;

		tools.disableBtns(btn);					
		tools.reset(pbs);
		window.console.clear();
		tools.highlight.clear(btn);
		//////pguis.forEach(pgui => pgui.reset());
		tools.reset(pguis);
		
		let promise = run(btn);
		
		promise.catch(error => {
			tools.enableBtns(btn);
			tools.highlight.rejected(btn);			
		});	

	}	
	