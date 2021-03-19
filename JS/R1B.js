
{
	
	let pgui = new PromiseGUI(1);
	
	let $tr = $('#tdR1BC2 table.demo tr');
	tools.prepend(pgui.$td, $tr);
	
	let btnR1BResolved =  $('#btnR1BResolved');
	let btnR1BRejected =  $('#btnR1BRejected');
	let btnR1BFulfilled =  $('#btnR1BFulfilled');
	let btnR1BCatched =  $('#btnR1BCatched');
	
	function btnR1BResolved_onclick(btn){
		debugger;
		pgui.reset();
		pgui.resolved();
		btnR1BResolved.prop('disabled', true);
		btnR1BRejected.prop('disabled', true);
		btnR1BFulfilled.prop('disabled', false);
		//btnR1BCatched.prop('disabled', false);
	}		
	
	function btnR1BRejected_onclick(btn){
		pgui.reset();
		pgui.rejected();
		btnR1BResolved.prop('disabled', true);
		btnR1BRejected.prop('disabled', true);
		btnR1BFulfilled.prop('disabled', false);
		btnR1BCatched.prop('disabled', false);
	}	
	
	function btnR1BFulfilled_onclick(btn){
		//pgui.reset();
		pgui.fulfilled();
		btnR1BRejected.prop('disabled', true);
		btnR1BResolved.prop('disabled', true);
		btnR1BFulfilled.prop('disabled', true);
	}
	
	function btnR1BReset_onclick(btn){
		pgui.reset();
		btnR1BRejected.prop('disabled', false);
		btnR1BResolved.prop('disabled', false);
		btnR1BFulfilled.prop('disabled', true);
		btnR1BCatched.prop('disabled', true);
	}	
	
	function btnR1BCatched_onclick(btn){
		//pgui.reset();
		pgui.catched();
		btnR1BCatched.prop('disabled', true);
	}	
	
	btnR1BReset_onclick();

}