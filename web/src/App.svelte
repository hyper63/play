<script>
	export let name;
</script>

<main>
	<div class="bg-gray-50 flex flex-col justify-center h-full py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
	<h1 class="mt-6 text-center text-5xl font-extrabold text-yellow-400">Welcome to play.hyper63</h1>
	<p class="mt-5 mb-5 text-center text-gray-600 max-w">an online playground service so that developers can try the hyper63 service</p>
	<p class="mt-5 mb-5 text-center text-sm text-gray-700">NOTE: This is just a playground so all data will be deleted periodically. Also, this is not a production ready instance of hyper63, it is a `nano` instance, basically similar to what you
	get when running hyper63 locally.</p>


  <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
	<h2 class="mt-3 text-center text-3xl font-extrabold text-gray-900">Get API Token</h2>
	<form class="mt-4 space-y-6">
		<div class="">
			<label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
			<div class="mt-1">
            <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
			</div>
      <div class="mt-5">
				<button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-yellow-500 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Get Token 
          </button>
        </div>
		</div>
	</form>
	</div>
	</div>
	</div>
</main>

<style>
</style>
