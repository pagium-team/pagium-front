<div id="chart-dashboard" class="projectList-page">
	<div id="input-select" class="pl-addProject-btn-panel">
		<a href="javascript:void(0)" class="btn-floating btn-large waves-effect waves-light pink tooltipped" data-position="right" data-delay="50" data-tooltip="添加项目" v-on:click="addProject();"><i class="mdi-content-add"></i></a>
	</div>
	<div class="row">
		<div class="col s4" style="padding: 20px 20px 0 20px;" v-for="project in projectList">
			<div class="card-panel" id="projectList" v-on:click="onProject(project.projectId)">
				<div class="project-title">{{project.projectName}}</div>
				<div class="row">
					<div class="col s12 m4 l4 project-icon">项目描述:</div>
					<div class="col s12 m4 l8 project-desc">{{project.projectDesc}}</div>
				</div>
				<div class="row">
					<div class="col s12 m4 l4 project-icon">创建时间:</div>
					<div class="col s12 m4 l8 project-desc">{{project.createTime}}</div>
				</div>
				<div class="row">
					<div class="col s12 m4 l4 project-icon">修改时间:</div>
					<div class="col s12 m4 l8 project-desc">{{project.updateTime}}</div>
				</div>
			</div>
		</div>
	</div>

</div>
