
async function deleteJob(id){
    const response = confirm('do you want to delete');

    if(response){
        const result = await fetch(`/job/${id}`,{method : 'DELETE'});
        if(result.ok){
            location.reload()   //reloading
        }
    }
}