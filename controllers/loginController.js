var user_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'sytsyt' && password === '521881') {
        //ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
		ctx.response.type='application/json';
		ctx.response.body={
			success:true
		};
    } else {
        ctx.response.type='application/json';
		ctx.response.body={
			success:false
		};
    }
};

module.exports = {
	'POST /signin' : user_signin
}