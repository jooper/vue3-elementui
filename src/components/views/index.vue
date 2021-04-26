<template>

  <div>    
    <section class="data_section">
      <header class="section_title">数据统计</header>     
      <el-row>
        <div id="app">
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </div>
      </el-row>

      <div>
        <el-row style="margin-top: 20px;">
  			<el-col :span="12" :offset="4">
		        <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
					<el-form-item label="店铺名称" prop="name">
						<el-input v-model="formData.name"></el-input>
					</el-form-item>
					<el-form-item label="详细地址" prop="address">
						<el-autocomplete
						  v-model="formData.address"
						  :fetch-suggestions="formData.is_premium"
						  placeholder="请输入地址"
						  style="width: 100%;"						  
						></el-autocomplete>
						<span>当前城市：{{formData.is_premium}}</span>
					</el-form-item>
					<el-form-item label="联系电话" prop="phone">
						<el-input v-model.number="formData.phone" maxLength="11"></el-input>
					</el-form-item>
					<el-form-item label="店铺简介" prop="description">
						<el-input v-model="formData.description"></el-input>
					</el-form-item>
					<el-form-item label="店铺标语" prop="promotion_info">
						<el-input v-model="formData.promotion_info"></el-input>
					</el-form-item>
					<el-form-item label="店铺分类">
						<el-cascader
						  :options="formData.is_premium"
						  v-model="formData.is_premium"
						  change-on-select
						></el-cascader>
					</el-form-item>
					<el-form-item label="店铺特点" style="white-space: nowrap;">
						<span>品牌保证</span>
						<el-switch on-text="" off-text="" v-model="formData.is_premium"></el-switch>
						<span>蜂鸟专送</span>
						<el-switch on-text="" off-text="" v-model="formData.delivery_mode"></el-switch>
						<span>新开店铺</span>
						<el-switch on-text="" off-text="" v-model="formData.new"></el-switch>
					</el-form-item>
					<el-form-item style="white-space: nowrap;">
						<span>外卖保</span>
						<el-switch on-text="" off-text="" v-model="formData.bao"></el-switch>
						<span>准时达</span>
						<el-switch on-text="" off-text="" v-model="formData.zhun"></el-switch>
						<span>开发票</span>
						<el-switch on-text="" off-text="" v-model="formData.piao"></el-switch>
					</el-form-item>
					<el-form-item label="配送费" prop="float_delivery_fee">
						<el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
					</el-form-item>
					<el-form-item label="起送价" prop="float_minimum_order_amount">
						<el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
					</el-form-item>
					<el-form-item label="营业时间" style="white-space: nowrap;">
						<el-time-select
							placeholder="起始时间"
							v-model="formData.startTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30'
							}">
						</el-time-select>
						<el-time-select
							placeholder="结束时间"
							v-model="formData.endTime"
							:picker-options="{
							start: '05:30',
							step: '00:15',
							end: '23:30',
							minTime: formData.startTime
							}">
						</el-time-select>
					</el-form-item>


				</el-form>
  			</el-col>
  		</el-row>
      </div>
    </section>    
  </div>
</template>


<script>
 export default {
    	data(){
    		return {
    			city: {},
    			formData: {
					name: '', //店铺名称
					address: '', //地址
					latitude: '',
					longitude: '',
					description: '', //介绍
					phone: '',
					promotion_info: '',
					float_delivery_fee: 5, //运费
					float_minimum_order_amount: 20, //起价
					is_premium: true,
					delivery_mode: true,
					new: true,
					bao: true,
					zhun: true,
					piao: true,
					startTime: '',
       	 			endTime: '',
       	 			image_path: '',
       	 			business_license_image: '',
       	 			catering_service_license_image: '',

		        },
		        rules: {
					name: [
						{ required: true, message: '请输入店铺名称', trigger: 'blur' },
					],
					address: [
						{ required: true, message: '请输入详细地址', trigger: 'blur' }
					],
					phone: [
						{ required: true, message: '请输入联系电话' },
						{ type: 'number', message: '电话号码必须是数字' }
					],
				},
				options: [{
		          	value: '满减优惠',
		          	label: '满减优惠'
		        }, {
		          	value: '优惠大酬宾',
		          	label: '优惠大酬宾'
		        }, {
		          	value: '新用户立减',
		          	label: '新用户立减'
		        }, {
		          	value: '进店领券',
		          	label: '进店领券'
		        }],
       	 		activityValue: '满减优惠',
				activities: [{
		        	icon_name: '减',
		        	name: '满减优惠',
		        	description: '满30减5，满60减8',
			    }],			    
			    categoryOptions: [],
			    selectedCategory: ['快餐便当', '简餐']
    		}
    	},

    	mounted(){
    		this.initData();
    	},
    	methods: {
    		async initData(){
    			try{
    				this.city = await cityGuess();
    				const categories = await foodCategory();
    				categories.forEach(item => {
    					if (item.sub_categories.length) {
    						const addnew = {
    							value: item.name,
						        label: item.name,
						        children: []
    						}
    						item.sub_categories.forEach((subitem, index) => {
    							if (index == 0) {
    								return
    							}
    							addnew.children.push({
    								value: subitem.name,
						        	label: subitem.name,
    							})
    						})
    						this.categoryOptions.push(addnew)

    					}
    				})
    			}catch(err){
    				console.log(err);
    			}
    		},
    		async querySearchAsync(queryString, cb) {
    			if (queryString) {
	    			try{
	    				const cityList = await searchplace(this.city.id, queryString);
	    				if (cityList instanceof Array) {
		    				cityList.map(item => {
		    					item.value = item.address;
		    					return item;
		    				})
		    				cb(cityList)
	    				}
	    			}catch(err){
	    				console.log(err)
	    			}
    			}
		    },
		    addressSelect(address){
		    	this.formData.latitude = address.latitude;
		    	this.formData.longitude = address.longitude;
		    	console.log(this.formData.latitude, this.formData.longitude)
		    },
			handleShopAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.image_path = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			handleBusinessAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.business_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			handleServiceAvatarScucess(res, file) {
				if (res.status == 1) {
					this.formData.catering_service_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},
			beforeAvatarUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
			tableRowClassName(row, index) {
		        if (index === 1) {
		        	return 'info-row';
		        } else if (index === 3) {
		        	return 'positive-row';
		        }
		        return '';
		    },
		    selectActivity(){
		    	this.$prompt('请输入活动详情', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		        }).then(({ value }) => {
		        	if (value == null) {
		        		this.$message({
				            type: 'info',
				            message: '请输入活动详情'
				        });
		        		return
		        	}
		          	let newObj = {};
		          	switch(this.activityValue){
		          		case '满减优惠':
		          			newObj= {
		          				icon_name: '减',
					        	name: '满减优惠',
					        	description: value,
		          			}
		          			break;
		          		case '优惠大酬宾':
		          			newObj= {
		          				icon_name: '特',
					        	name: '优惠大酬宾',
					        	description: value,
		          			}
		          			break;
		          		case '新用户立减':
		          			newObj= {
		          				icon_name: '新',
					        	name: '新用户立减',
					        	description: value,
		          			}
		          			break;
		          		case '进店领券':
		          			newObj= {
		          				icon_name: '领',
					        	name: '进店领券',
					        	description: value,
		          			}
		          			break;
		          	}
		          	this.activities.push(newObj);
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '取消输入'
		          	});
		        });
		    },
		    handleDelete(index){
		    	this.activities.splice(index, 1)
		    },
		    submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						Object.assign(this.formData, {activities: this.activities}, {
							category: this.selectedCategory.join('/')
						})
						try{
							let result = await addShop(this.formData);
							if (result.status == 1) {
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
					          	this.formData = {
									name: '', //店铺名称
									address: '', //地址
									latitude: '',
									longitude: '',
									description: '', //介绍
									phone: '',
									promotion_info: '',
									float_delivery_fee: 5, //运费
									float_minimum_order_amount: 20, //起价
									is_premium: true,
									delivery_mode: true,
									new: true,
									bao: true,
									zhun: true,
									piao: true,
									startTime: '',
				       	 			endTime: '',
				       	 			image_path: '',
				       	 			business_license_image: '',
				       	 			catering_service_license_image: '',
						        };
						        this.selectedCategory = ['快餐便当', '简餐'];
						        this.activities = [{
						        	icon_name: '减',
						        	name: '满减优惠',
						        	description: '满30减5，满60减8',
							    }];
							}else{
								this.$message({
					            	type: 'error',
					            	message: result.message
					          	});
							}
							console.log(result)
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			},
		}
    }
</script>
