exports.friendRequestTemplate = (senderName) => `
<div style="margin:0;padding:0;background:#f3f4f6;font-family:'Inter',Arial,sans-serif;">
  <div style="max-width:520px;margin:40px auto;background:rgba(255,255,255,0.98);
    border-radius:20px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.08);
    backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.3);">
    
    <!-- Header Gradient -->
    <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);
      background-size:200% 200%;height:8px;animation:gradientShift 6s ease infinite;"></div>

    <!-- Hero Section -->
    <div style="text-align:center;padding:45px 30px;">
      <img src="https://cdn-icons-png.flaticon.com/512/4072/4072546.png" alt="Dream Journal Icon"
        style="width:70px;height:70px;object-fit:contain;margin-bottom:20px;" />
      
      <h2 style="font-size:24px;font-weight:700;color:#111827;margin-bottom:12px;">
        🌙 Dream Journal Connection Request
      </h2>

      <p style="color:#6b7280;font-size:15px;margin-bottom:30px;line-height:1.6;">
        <strong>${senderName}</strong> wants to connect with you and become your DreamMate!<br/>
        Share your dreams, insights, and creativity together.
      </p>

      <a href="${process.env.FRONTEND_URL}/friends"
         style="display:inline-block;padding:14px 36px;border-radius:14px;
         background:linear-gradient(135deg,#6366f1,#8b5cf6,#ec4899);
         color:white;text-decoration:none;font-weight:600;letter-spacing:0.5px;
         box-shadow:0 6px 18px rgba(99,102,241,0.35);transition:all 0.3s ease;">
        View Request →
      </a>

      <p style="color:#9ca3af;font-size:13px;margin-top:35px;line-height:1.5;">
        You can view or respond to this request anytime from your Dream Journal Friends page.
      </p>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #e5e7eb;padding:25px 30px;text-align:center;">
      <p style="font-size:12px;color:#9ca3af;margin-bottom:5px;">
        © ${new Date().getFullYear()} Dream Journal — Dream together, grow together 🌙
      </p>

      <p style="font-size:12px;color:#9ca3af;line-height:1.4;">
        Crafted with ❤️ by 
        <strong style="color:#6366f1;">Satinder Singh Sall</strong><br/>
        <a href="https://github.com/SatinderSinghSall" style="color:#8b5cf6;text-decoration:none;">GitHub Repo</a> • 
        <a href="https://satinder-portfolio.vercel.app/" style="color:#ec4899;text-decoration:none;">Portfolio</a>
      </p>
    </div>
  </div>

  <!-- Gradient Animation Keyframes -->
  <style>
    @keyframes gradientShift {
      0% {background-position:0% 50%;}
      50% {background-position:100% 50%;}
      100% {background-position:0% 50%;}
    }
  </style>
</div>
`;
