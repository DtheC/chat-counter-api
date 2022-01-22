// $(eval
// let r = '';
// if (isNaN($(1))) {
//   r = $(1) + "is not a number nikono6Omg";
// }
// if ($(1) <= 0) {
//   r = "That's not how math works.";
// }
// if ($(1) == 1){
//   r = "It's 1. Come on... you didn't need me for that.";
// }

// r ? r : "The Square Root of " + $(1) + " is: " + Math.sqrt($(1)).toFixed(2);

// )

// Add to specific counter:

$(eval
  
  const counterName = 'chatDamage';
  const url = `https://shielded-meadow-84535.herokuapp.com/add?name=${counterName}`;
  const api = $(urlfetch json url);

  `${api[0].name} - ${api[0].amount}`;
  
  )

// Stats:

  $(eval 

    let message = '';
    const api = $(urlfetch json https://shielded-meadow-84535.herokuapp.com/stats);
    api.message;
    )

  