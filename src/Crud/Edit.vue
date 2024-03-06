<script setup lang="ts">
import NForm from '@/Crud/VForm.vue';
import { useForm } from '@/shared';
import type { KV, NFormItem, UProps } from '@/types';
import { ArrowRightOutlined } from '@ant-design/icons-vue';
import { type DrawerProps, type FormProps } from 'ant-design-vue';
import { ref } from 'vue';

interface Props extends UProps {
	before?: ((formData: KV) => Promise<KV>) | (() => void);
	formProps?: FormProps;
	drawerProps?: DrawerProps;
	modelValue: KV;
	items: (formData: KV) => NFormItem[];
	done: (formData: KV, row: KV) => Promise<[boolean, string?]>;
}
interface Emits {
	(type: 'success', formData: KV): void;
	(type: 'fail', error: unknown): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const currentRow = ref<KV>({});

const { nFormRef, isShow, isSubmitting, save, reset, formData, setDefault } = useForm(
	props.done,
	currentRow,
	(formData) => {
		emit('success', formData);
	},
	(error) => {
		emit('fail', error);
	}
);

const isLoading = ref(false);
const errorMessage = ref('');
/**
 * 显示表单
 * @param row 当前行
 */
async function show(row: KV) {
	isShow.value = true;
	isLoading.value = true;
	errorMessage.value = '';
	currentRow.value = row;
	try {
		setDefault(row);
		// 前置操作,
		// 可用来获取默认值
		if (props.before) {
			const data = await props.before(row);
			if (data) {
				setDefault(data ? data : {});
				formData.value = data;
			}
		}
	} catch (error) {
		console.log(error);
		errorMessage.value = 'string' === typeof error ? error : '系统故障,请稍后重试';
	} finally {
		isLoading.value = false;
	}
}

defineExpose({
	show,
});
</script>

<template>
	<a-drawer v-model:visible="isShow" title="编辑" size="large" v-bind="drawerProps">
		<a-skeleton :loading="isLoading" active>
			<a-result v-if="errorMessage" status="500" title="出错了" :sub-title="errorMessage">
				<template #extra>
					<a-button type="primary" @click="isShow = false">
						<template #icon>
							<arrow-right-outlined />
						</template>
						关闭</a-button>
				</template>
			</a-result>
			<n-form v-else v-model="formData" ref="nFormRef" :items="items" :formProps="formProps"></n-form>
		</a-skeleton>

		<template v-if="!isLoading && !errorMessage" #footer>
			<a-space>
				<a-button :loading="isSubmitting" @click="reset">重置</a-button>
				<a-button type="primary" :loading="isSubmitting" @click="save">确定</a-button></a-space>
		</template>
	</a-drawer>
</template>
