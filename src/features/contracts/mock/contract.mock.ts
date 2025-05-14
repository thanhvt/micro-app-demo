import { Contract, ContractStatus, ContractType, PaymentMethod, PaymentStatus, CurrencyCode, ApprovalStatus } from '../types/contract.types';
import { CONTRACT_STATUS, CONTRACT_TYPE, PAYMENT_METHOD, PAYMENT_STATUS, CURRENCY, APPROVAL_STATUS } from '../constants/contract.constants';

const generateId = () => Math.random().toString(36).substr(2, 9);

const contractTypes = Object.values(CONTRACT_TYPE);
const contractStatuses = Object.values(CONTRACT_STATUS);
const paymentMethods = Object.values(PAYMENT_METHOD);
const paymentStatuses = Object.values(PAYMENT_STATUS);
const currencies = Object.values(CURRENCY);
const approvalStatuses = Object.values(APPROVAL_STATUS);

// Danh sách các công ty thường xuất hiện trong hợp đồng
const companies = [
  {
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    shortName: 'Vietcombank',
    taxCode: '0100112437',
    address: '198 Trần Quang Khải, Hoàn Kiếm, Hà Nội',
    representative: 'Nguyễn Thanh Tùng',
    position: 'Tổng Giám đốc',
    phone: '024.38240422',
    email: 'vcb.csr@vietcombank.com.vn'
  },
  {
    name: 'Công ty Cổ phần FPT',
    shortName: 'FPT',
    taxCode: '0101248163',
    address: 'Tòa nhà FPT, 17 Dương Đình Nghệ, Cầu Giấy, Hà Nội',
    representative: 'Nguyễn Văn Khoa',
    position: 'Tổng Giám đốc',
    phone: '024.73007300',
    email: 'fpt@fpt.com.vn'
  },
  {
    name: 'Tập đoàn Vingroup',
    shortName: 'Vingroup',
    taxCode: '0101245486',
    address: 'Số 7, đường Bằng Lăng 1, Phường Việt Hưng, Quận Long Biên, Hà Nội',
    representative: 'Phạm Nhật Vượng',
    position: 'Chủ tịch HĐQT',
    phone: '024.39743999',
    email: 'info@vingroup.net'
  },
  {
    name: 'Công ty TNHH Giải pháp Công nghệ BIKAMI',
    shortName: 'BIKAMI',
    taxCode: '0101156128',
    address: 'Tầng 7, Tòa nhà Technosoft, 8 Láng Hạ, Đống Đa, Hà Nội',
    representative: 'Vũ Minh Thành',
    position: 'Giám đốc',
    phone: '024.32004567',
    email: 'contact@bikami.vn'
  },
  {
    name: 'Công ty Cổ phần Thương mại Dịch vụ Một Máy',
    shortName: 'Một Máy',
    taxCode: '0104988723',
    address: 'Tầng 5, Tòa nhà Sơn Tây, 23 Lê Văn Lương, Hà Nội',
    representative: 'Nguyễn Khánh Sơn',
    position: 'Giám đốc điều hành',
    phone: '024.35772778',
    email: 'info@motmay.vn'
  },
  {
    name: 'Công ty Cổ phần Giải pháp Thanh toán Việt Nam',
    shortName: 'VNPAY',
    taxCode: '0102182292',
    address: 'Tầng 8, 22 Láng Hạ, Đống Đa, Hà Nội',
    representative: 'Mai Thanh Bình',
    position: 'Tổng Giám đốc',
    phone: '024.37761999',
    email: 'info@vnpay.vn'
  },
  {
    name: 'Công ty Cổ phần Mỹ phẩm HANA',
    shortName: 'HANA',
    taxCode: '0101635912',
    address: 'Tầng 6, Tháp A, Tòa nhà Keangnam, Phạm Hùng, Cầu Giấy, Hà Nội',
    representative: 'Lê Thị Thu Hà',
    position: 'Giám đốc điều hành',
    phone: '024.35561111',
    email: 'contact@hanacosmetics.vn'
  },
  {
    name: 'Công ty TNHH Công nghệ TechVision',
    shortName: 'TechVision',
    taxCode: '0102354781',
    address: '22 Võ Chí Công, Cầu Giấy, Hà Nội',
    representative: 'Lê Văn Nam',
    position: 'Giám đốc',
    phone: '024.66889900',
    email: 'info@techvision.vn'
  },
  {
    name: 'Tập đoàn Bưu chính Viễn thông Việt Nam',
    shortName: 'VNPT',
    taxCode: '0100684378',
    address: 'Số 57 Huỳnh Thúc Kháng, Đống Đa, Hà Nội',
    representative: 'Phạm Đức Long',
    position: 'Chủ tịch kiêm Tổng Giám đốc',
    phone: '024.37741091',
    email: 'vanphong@vnpt.vn'
  },
  {
    name: 'Công ty Cổ phần Tập Đoàn Mặt Trời',
    shortName: 'Sungroup',
    taxCode: '0107950234',
    address: 'Tầng 15, Tòa nà Sunwah, 115 Nguyễn Huệ, Hoàn Kiếm, Hà Nội',
    representative: 'Đào Ngọc Thanh',
    position: 'Phó Tổng Giám đốc',
    phone: '024.39439786',
    email: 'info@sungroup.com.vn'
  }
];

const generateParty = (isPartyA: boolean) => {
  // Lấy ngẫu nhiên 2 công ty khác nhau
  const companyIndexA = Math.floor(Math.random() * companies.length);
  let companyIndexB = Math.floor(Math.random() * companies.length);
  
  // Đảm bảo 2 công ty khác nhau
  while (companyIndexB === companyIndexA) {
    companyIndexB = Math.floor(Math.random() * companies.length);
  }
  
  const company = isPartyA ? companies[companyIndexA] : companies[companyIndexB];
  
  return {
    companyName: company.name,
    taxCode: company.taxCode,
    address: company.address,
    representative: company.representative,
    position: company.position,
    phone: company.phone,
    email: company.email
  };
};

// Danh sách các sản phẩm/dịch vụ theo loại hợp đồng
const productsByType = {
  [CONTRACT_TYPE.SERVICE]: [
    { name: 'Dịch vụ CNTT toàn diện', unit: 'Gói', priceRange: [100000000, 500000000], desc: 'Cung cấp dịch vụ vận hành, quản trị và bảo trì hệ thống CNTT' },
    { name: 'Dịch vụ phát triển phần mềm', unit: 'Dự án', priceRange: [200000000, 800000000], desc: 'Thiết kế và phát triển các phần mềm theo yêu cầu của khách hàng' },
    { name: 'Dịch vụ tư vấn CNTT', unit: 'Buổi', priceRange: [5000000, 20000000], desc: 'Cung cấp dịch vụ tư vấn về chiến lược và giải pháp CNTT' },
    { name: 'Triển khai hệ thống ERP', unit: 'Gói', priceRange: [500000000, 2000000000], desc: 'Cung cấp và triển khai hệ thống quản trị nguồn lực doanh nghiệp ERP' },
    { name: 'Dịch vụ bảo mật CNTT', unit: 'Tháng', priceRange: [50000000, 150000000], desc: 'Cung cấp dịch vụ giám sát và bảo mật thông tin' },
    { name: 'Di chuyển lên Cloud', unit: 'Dự án', priceRange: [300000000, 1000000000], desc: 'Dịch vụ chuyển đổi hệ thống lên nền tảng điện toán đám mây' },
    { name: 'Dịch vụ số hóa tài liệu', unit: 'Tháng', priceRange: [100000000, 300000000], desc: 'Cung cấp dịch vụ số hóa và quản lý tài liệu' }
  ],
  [CONTRACT_TYPE.PRODUCT]: [
    { name: 'Máy chủ IBM Power9', unit: 'Chiếc', priceRange: [500000000, 1500000000], desc: 'Máy chủ IBM Power9 cấu hình cao dành cho doanh nghiệp' },
    { name: 'Giải pháp lưu trữ Dell EMC', unit: 'Hệ thống', priceRange: [800000000, 2000000000], desc: 'Hệ thống lưu trữ dữ liệu doanh nghiệp Dell EMC' },
    { name: 'Thẻ thông minh VNPAY', unit: 'Thẻ', priceRange: [200000, 500000], desc: 'Thẻ thanh toán thông minh tích hợp công nghệ NFC' },
    { name: 'Bản quyền phần mềm Microsoft 365', unit: 'Bản quyền', priceRange: [3000000, 10000000], desc: 'Bản quyền phần mềm Microsoft 365 cho doanh nghiệp' },
    { name: 'Giải pháp bảo mật Kaspersky', unit: 'Gói', priceRange: [100000000, 300000000], desc: 'Giải pháp bảo mật toàn diện Kaspersky cho doanh nghiệp' }
  ],
  [CONTRACT_TYPE.MAINTENANCE]: [
    { name: 'Bảo trì hệ thống Core Banking', unit: 'Năm', priceRange: [1000000000, 3000000000], desc: 'Dịch vụ bảo trì và hỗ trợ hệ thống Core Banking' },
    { name: 'Bảo trì hệ thống mạng', unit: 'Tháng', priceRange: [50000000, 150000000], desc: 'Dịch vụ bảo trì và quản trị hệ thống mạng' },
    { name: 'Bảo trì hệ thống server', unit: 'Tháng', priceRange: [70000000, 200000000], desc: 'Dịch vụ bảo trì và vận hành hệ thống máy chủ' }
  ],
  [CONTRACT_TYPE.CONSULTING]: [
    { name: 'Tư vấn chiến lược CNTT', unit: 'Dự án', priceRange: [200000000, 800000000], desc: 'Dịch vụ tư vấn xây dựng chiến lược CNTT cho doanh nghiệp' },
    { name: 'Tư vấn chuyển đổi số', unit: 'Gói', priceRange: [500000000, 1500000000], desc: 'Dịch vụ tư vấn lộ trình chuyển đổi số toàn diện' },
    { name: 'Tư vấn giải pháp bảo mật', unit: 'Dự án', priceRange: [300000000, 800000000], desc: 'Dịch vụ tư vấn và đánh giá an toàn thông tin' }
  ],
  [CONTRACT_TYPE.OTHER]: [
    { name: 'Kết nối Core Banking - Thanh toán', unit: 'Gói', priceRange: [500000000, 1200000000], desc: 'Dịch vụ kết nối hệ thống Core Banking với cổng thanh toán' },
    { name: 'Nâng cấp hệ thống API Gateway', unit: 'Dự án', priceRange: [400000000, 900000000], desc: 'Dịch vụ nâng cấp hệ thống API Gateway' },
    { name: 'Xây dựng hệ thống BI', unit: 'Gói', priceRange: [700000000, 1500000000], desc: 'Xây dựng hệ thống phân tích kinh doanh BI' }
  ]
};

const generateProducts = (contractType: ContractType, count: number) => {
  const availableProducts = productsByType[contractType] || productsByType[CONTRACT_TYPE.OTHER];
  const selectedProducts = [];

  // Chọn ngẫu nhiên các sản phẩm/dịch vụ tương ứng với loại hợp đồng
  for (let i = 0; i < Math.min(count, availableProducts.length); i++) {
    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    const product = availableProducts[randomIndex];
    
    // Tránh trùng lặp sản phẩm
    availableProducts.splice(randomIndex, 1);
    
    const quantity = Math.floor(Math.random() * 10) + 1;
    const price = Math.floor(Math.random() * (product.priceRange[1] - product.priceRange[0])) + product.priceRange[0];

    selectedProducts.push({
      id: generateId(),
      code: `PRD${String(i + 1).padStart(3, '0')}`,
      name: product.name,
      unit: product.unit,
      quantity: quantity,
      price: price,
      totalAmount: quantity * price,
      description: product.desc
    });
  }
  
  // Nếu chưa đủ số lượng, thêm các sản phẩm tổng hợp
  if (selectedProducts.length < count) {
    const additionalCount = count - selectedProducts.length;
    const allProducts = Object.values(productsByType).flat();
    
    for (let i = 0; i < additionalCount; i++) {
      // Make sure we have valid products before selecting one
      if (allProducts.length === 0) {
        continue; // Skip this iteration if no products available
      }
      
      const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
      
      // Skip if randomProduct is undefined or doesn't have priceRange
      if (!randomProduct || !randomProduct.priceRange) {
        continue;
      }
      
      const quantity = Math.floor(Math.random() * 10) + 1;
      const price = Math.floor(Math.random() * (randomProduct.priceRange[1] - randomProduct.priceRange[0])) + randomProduct.priceRange[0];

      selectedProducts.push({
        id: generateId(),
        code: `PRD${String(selectedProducts.length + 1).padStart(3, '0')}`,
        name: randomProduct.name,
        unit: randomProduct.unit,
        quantity: quantity,
        price: price,
        totalAmount: quantity * price,
        description: randomProduct.desc
      });
    }
  }
  
  return selectedProducts;
};

const generatePaymentSchedules = (totalAmount: number, count: number) => {
  const schedules = [];
  let remainingAmount = totalAmount;
  
  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1;
    const amount = isLast ? remainingAmount : Math.floor(totalAmount / count);
    remainingAmount -= amount;

    schedules.push({
      id: generateId(),
      installment: i + 1,
      dueDate: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000).toISOString(),
      amount,
      method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)] as PaymentMethod,
      status: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)] as PaymentStatus,
      note: `Đợt thanh toán thứ ${i + 1}`
    });
  }

  return schedules;
};

const generateAttachments = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: generateId(),
    name: `Tài liệu ${index + 1}.pdf`,
    type: 'application/pdf',
    size: Math.floor(Math.random() * 5000000) + 100000,
    uploadDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    uploadedBy: 'Người dùng Test',
    url: `https://example.com/documents/${generateId()}.pdf`
  }));
};

const generateApprovals = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    level: index + 1,
    approver: `Người phê duyệt ${index + 1}`,
    dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)] as ApprovalStatus,
    comment: Math.random() > 0.5 ? `Nhận xét cho cấp phê duyệt ${index + 1}` : undefined
  }));
};

export const generateContract = (): Contract => {
  // Chọn ngẫu nhiên loại hợp đồng
  const contractType = contractTypes[Math.floor(Math.random() * contractTypes.length)] as ContractType;
  
  // Generate products first to calculate total value
  const products = generateProducts(contractType, Math.floor(Math.random() * 5) + 3);
  const totalValue = products.reduce((sum, product) => {
    return sum + product.totalAmount;
  }, 0);

  const paymentSchedules = generatePaymentSchedules(
    totalValue,
    Math.floor(Math.random() * 3) + 2
  );

  const now = new Date();
  const effectiveDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const expiryDate = new Date(effectiveDate.getTime() + 365 * 24 * 60 * 60 * 1000);

  return {
    id: generateId(),
    basicInfo: {
      contractCode: `HĐ${Date.now().toString().slice(-6)}`,
      contractName: `Hợp đồng ${Math.floor(Math.random() * 1000) + 1}`,
      contractType: contractType,
      status: contractStatuses[Math.floor(Math.random() * contractStatuses.length)] as ContractStatus,
      effectiveDate: effectiveDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      partyA: generateParty(true),
      partyB: generateParty(false)
    },
    detailInfo: {
      totalValue,
      currency: currencies[Math.floor(Math.random() * currencies.length)] as CurrencyCode,
      exchangeRate: Math.random() * 23000 + 23000,
      vatRate: [0, 5, 8, 10][Math.floor(Math.random() * 4)],
      additionalFees: Math.floor(Math.random() * 1000000),
      paymentTerms: 'Thanh toán theo đợt dựa trên tiến độ thực hiện',
      implementationTime: '12 tháng kể từ ngày ký hợp đồng',
      implementationLocation: 'Tại trụ sở của bên A và bên B',
      warrantyRequirements: '12 tháng bảo hành',
      penaltyTerms: '0.1% giá trị hợp đồng cho mỗi ngày chậm trễ',
      products,
      paymentSchedules
    },
    attachments: {
      appendices: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, index) => ({
        id: generateId(),
        number: `PL${index + 1}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        description: `Phụ lục ${index + 1} về điều khoản bổ sung`
      })),
      documents: generateAttachments(Math.floor(Math.random() * 5) + 2),
      approvals: generateApprovals(Math.floor(Math.random() * 3) + 2),
      notes: Math.random() > 0.5 ? 'Ghi chú bổ sung cho hợp đồng' : undefined
    },
    confirmation: {
      createdBy: 'Người dùng Test',
      createdAt: now.toISOString(),
      comments: Math.random() > 0.5 ? 'Nhận xét khi tạo hợp đồng' : undefined,
      termsAccepted: true
    },
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };
};

// Generate a list of mock contracts
export const mockContracts: Contract[] = Array.from(
  { length: 25 },
  generateContract
);
