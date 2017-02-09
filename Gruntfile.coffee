module.exports = (grunt) ->

	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')
		
		# copy:
		# 	main:
		# 		src: 'src/manifest_full.json'
		# 		dest: 'src/manifest.json'
		lineremover:
			customExclude:
				files:
					'src/manifest.json': 'src/manifest_full.json'
				options:
					exclusionPattern: /\/\/(.*)/g

		jsonlint:
			all:
				src: ['src/manifest.json']
				options:
					format: true
					indent: 2



	grunt.loadNpmTasks 'grunt-line-remover'
	grunt.loadNpmTasks 'grunt-jsonlint'
	grunt.registerTask 'default', [
		'lineremover',
		'jsonlint'
	]