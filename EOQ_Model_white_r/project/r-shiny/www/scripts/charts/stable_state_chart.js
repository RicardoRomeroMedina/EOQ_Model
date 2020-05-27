/*
 * Function that allows me to validate that the information has been entered,
 * in case it is, it will be sent to the server.
 */
const validate_information = () => {
    /* I get the values from the inputs. */
    let demand, ordering, holding, shortage,business;
    demand = document.getElementById('demand').value;
    //demand_split = demand.split('');
    demand_result = parseFloat(demand);
    ordering = document.getElementById('ordering').value;
    //ordering_split = ordering.split('');
    ordering_result = parseFloat(ordering);
    holding = parseFloat(document.getElementById('holding').value);
    holding_result = parseFloat((holding/10));
    holding_length = document.getElementById('holding').value.length;
    shortage_length = document.getElementById('shortage').value.length;
    shortage = parseFloat(document.getElementById('shortage').value);
    business = parseInt(document.getElementById('days').value);
    /* Validation */
    if (demand.length > 0 && ordering.length > 0 && holding_length > 0 && shortage_length > 0) {
        /* I save everything in a JSON that i will send to the server. */
        let json = {
            demand: demand_result,
            ordering: ordering_result,
            holding: holding_result,
            shortage: shortage,
            business: business
        }
        /* I send the information to Shiny. */
        Shiny.onInputChange("click", json);
    } else {
        /* I send an alert that there are missing fields to fill out. */
        alert("There are fields without being completed, complete the fields to continue.");
    }
}

/*
 * Function that allows me to generate the graph of the
 * probabilities of "n" users in the system.
 */
const generate_stable_state_chart = (info) => {
    /*  Generation of the chart. */
    let ctx = document.getElementById('stable_state_chart').getContext('2d');
    //let stable_state_chart = new Chart(ctx, {
        //type: 'bar',
        //data: {
            //labels: ['p0', 'p1', 'p2'],
            //datasets: [{
                //label: 'The probability (p0, p1, ..., pk) are:',
                //data: [info[0][0], info[0][1], info[0][2]],
                //backgroundColor: [
                    //'rgba(255, 99, 132, 0.2)',
                    //'rgba(54, 162, 235, 0.2)',
                    //'rgba(255, 206, 86, 0.2)'
                //],
                //borderColor: [
                    //'rgba(255, 99, 132, 1)',
                    //'rgba(54, 162, 235, 1)',
                    //'rgba(255, 206, 86, 1)'
                //],
                //borderWidth: 1
            //}]
        //},
        //options: {
            //scales: {
                //yAxes: [{
                    //ticks: {
                        //beginAtZero: true
                    //}
                //}]
            //}
        //}
    //});
    /* Generation of the statistical report. */
    /* I show the hidden paragraphs and then i print the information. */
    let p_length = document.getElementsByTagName("p").length;
    for (let i = 0; i < p_length; i++) {
        document.getElementsByTagName("p")[i].style.visibility = "visible";
    }
    document.getElementById('maximum backorders in units').innerHTML = info[0];
    document.getElementById('time between orders').innerHTML = info[1];
    document.getElementById('total variable cost').innerHTML = info[2];
    document.getElementById('reorder when inventory on hand').innerHTML = info[3];
    document.getElementById('annual ordering cost').innerHTML = info[4];
    document.getElementById('annual holding cost').innerHTML = info[5];
    document.getElementById('number of orders').innerHTML = info[6];
    document.getElementById('daily demand').innerHTML = info[7];
    document.getElementById('lead time').innerHTML = info[8];
    document.getElementById('total cost').innerHTML = info[9];
}
