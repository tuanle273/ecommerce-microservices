# Kubernetes Manifests for Ecommerce Microservices

Thư mục này chứa các file manifest Kubernetes để triển khai ứng dụng Ecommerce Microservices trên Kubernetes.

## Cấu trúc thư mục

```
kubernetes-manifests/
├── base/                  # Cấu hình cơ bản chung cho tất cả môi trường
│   ├── config/            # ConfigMaps và Secrets
│   ├── deployments/       # Deployments cho các services
│   ├── ingress/           # Ingress rules
│   ├── services/          # Services definitions
│   ├── storage/           # PersistentVolumeClaims
│   ├── kustomization.yaml # Kustomize config cho base
│   └── namespace.yaml     # Namespace definition
│
└── overlays/              # Cấu hình riêng cho từng môi trường
    ├── dev/               # Môi trường development
    │   ├── kustomization.yaml
    │   └── replicas-patch.yaml
    └── prod/              # Môi trường production
        ├── kustomization.yaml
        ├── replicas-patch.yaml
        └── resources-patch.yaml
```

## Triển khai ứng dụng

### Môi trường Development

```bash
kubectl apply -k kubernetes-manifests/overlays/dev
```

### Môi trường Production

```bash
kubectl apply -k kubernetes-manifests/overlays/prod
```

## Các thành phần chính

1. **Databases**:
   - MySQL cho Order Service
   - MySQL cho Inventory Service
   - MongoDB cho Product Service
   - MySQL cho Keycloak

2. **Microservices**:
   - Discovery Server (Netflix Eureka)
   - API Gateway (Spring Cloud Gateway)
   - Product Service
   - Order Service
   - Inventory Service
   - Notification Service
   - Keycloak (Authentication)
   - Frontend (Next.js)

3. **Monitoring & Observability**:
   - Zipkin (Distributed Tracing)
   - Prometheus (Metrics Collection)
   - Grafana (Visualization)

4. **Messaging**:
   - Kafka
   - Zookeeper

## Cấu hình

### Secrets

Các secrets trong môi trường production cần được cập nhật với giá trị thực:

- `keycloak-client-secret`: Client secret từ Keycloak
- `nextauth-secret`: Secret key cho NextAuth.js

### Ingress

Ingress được cấu hình với các host sau:
- `ecommerce.tuanla.dev`: Frontend application
- `api.tuanla.dev`: API Gateway và các dịch vụ monitoring

Để truy cập ứng dụng cục bộ, thêm các dòng sau vào file `/etc/hosts` (Linux/Mac) hoặc `C:\Windows\System32\drivers\etc\hosts` (Windows):

```
127.0.0.1 ecommerce.tuanla.dev
127.0.0.1 api.tuanla.dev
```

## Lưu ý

- Các image được sử dụng trong manifests này giả định rằng bạn đã build và push các image của microservices lên registry.
- Để sử dụng local images, thay đổi `imagePullPolicy` thành `Never` và đảm bảo các images đã được build cục bộ.
- PersistentVolumeClaims sử dụng StorageClass mặc định của cluster. Tùy chỉnh nếu cần thiết.

## Mở rộng

Để mở rộng ứng dụng, bạn có thể:

1. Tăng số lượng replicas trong file `replicas-patch.yaml`
2. Điều chỉnh resource limits trong file `resources-patch.yaml`
3. Thêm các service mới vào các thư mục tương ứng và cập nhật `kustomization.yaml`
