# Tekton Pipelines cho Ecommerce Microservices

Thư mục này chứa các tài nguyên Tekton để xây dựng và triển khai ứng dụng Ecommerce Microservices trên OpenShift.

## Cấu trúc thư mục

```
tekton-pipelines/
├── tasks/           # Các Tekton Task để thực hiện các bước riêng lẻ
├── pipelines/       # Các Tekton Pipeline kết hợp nhiều Task
├── resources/       # Các PipelineResource như Git và Image
└── triggers/        # Các Trigger và TriggerTemplate để tự động hóa Pipeline
```

## Các Pipeline

1. **Build Pipeline**: Build Docker image từ mã nguồn và đẩy lên container registry
2. **Deploy Pipeline**: Triển khai ứng dụng lên OpenShift
3. **CI/CD Pipeline**: Kết hợp cả build và deploy

## Các Task

1. **git-clone**: Clone mã nguồn từ Git repository
2. **maven-build**: Build ứng dụng Java bằng Maven
3. **buildah**: Build và push Docker image
4. **npm-build**: Build ứng dụng Frontend
5. **deploy-to-openshift**: Triển khai lên OpenShift bằng kustomize

## Cách sử dụng

### Yêu cầu

- OpenShift 4.x
- Tekton Pipelines đã được cài đặt
- Tekton CLI (tkn)

### Triển khai Tekton Resources

```bash
# Triển khai Tasks
oc apply -f tekton-pipelines/tasks/

# Triển khai Pipelines
oc apply -f tekton-pipelines/pipelines/

# Triển khai Triggers (nếu cần)
oc apply -f tekton-pipelines/triggers/
```

### Chạy Pipeline thủ công

```bash
# Chạy build pipeline cho backend service
tkn pipeline start build-pipeline \
  -p git-url=https://github.com/yourusername/ecommerce-microservices.git \
  -p git-revision=main \
  -p image-name=image-registry.openshift-image-registry.svc:5000/ecommerce/product-service \
  -p context-dir=product-service \
  --workspace name=shared-workspace,claimName=tekton-pvc

# Chạy build pipeline cho frontend
tkn pipeline start frontend-build-pipeline \
  -p git-url=https://github.com/yourusername/ecommerce-microservices.git \
  -p git-revision=main \
  -p image-name=image-registry.openshift-image-registry.svc:5000/ecommerce/frontend \
  -p context-dir=frontend \
  --workspace name=shared-workspace,claimName=tekton-pvc
```

### Thiết lập Webhook

Để tự động kích hoạt pipeline khi có commit mới vào repository:

1. Tạo route cho EventListener:
   ```bash
   oc expose svc el-ecommerce-webhook
   ```

2. Lấy URL của route:
   ```bash
   oc get route el-ecommerce-webhook -o jsonpath='{.spec.host}'
   ```

3. Cấu hình webhook trong GitHub/GitLab repository với URL này.
