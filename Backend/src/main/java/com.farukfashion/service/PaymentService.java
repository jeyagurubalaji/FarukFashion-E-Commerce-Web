package com.farukfashion.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class PaymentService {

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    public Map<String, String> createRazorpayOrder(BigDecimal amount, String receipt) {
        try {
            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            JSONObject options = new JSONObject();
            // Razorpay expects amount in paise
            options.put("amount", amount.multiply(BigDecimal.valueOf(100)).intValue());
            options.put("currency", "INR");
            options.put("receipt", receipt);
            options.put("payment_capture", 1);

            Order order = client.orders.create(options);

            Map<String, String> result = new HashMap<>();
            result.put("razorpayOrderId", order.get("id"));
            result.put("amount", String.valueOf(order.get("amount")));
            result.put("currency", order.get("currency"));
            result.put("keyId", keyId);
            return result;
        } catch (RazorpayException e) {
            log.error("Razorpay order creation failed: {}", e.getMessage());
            // For development without real keys, return mock
            Map<String, String> mock = new HashMap<>();
            mock.put("razorpayOrderId", "order_mock_" + System.currentTimeMillis());
            mock.put("amount", amount.multiply(BigDecimal.valueOf(100)).toPlainString());
            mock.put("currency", "INR");
            mock.put("keyId", keyId);
            mock.put("mock", "true");
            return mock;
        }
    }

    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        try {
            String payload = orderId + "|" + paymentId;
            String expected = hmacSha256(payload, keySecret);
            return expected.equals(signature);
        } catch (Exception e) {
            log.error("Payment verification error: {}", e.getMessage());
            // In mock mode accept
            return signature != null && signature.startsWith("mock");
        }
    }

    private String hmacSha256(String data, String key) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] hash = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }
}
