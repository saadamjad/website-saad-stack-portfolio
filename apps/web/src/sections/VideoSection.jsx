import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import pb from '@/lib/pocketbaseClient';
import { Upload, Loader2, Play } from 'lucide-react';

const VideoSection = () => {
  const [video, setVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [title, setTitle] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    try {
      const isAuthenticated = pb.authStore.isValid;
      if (!isAuthenticated) return;

      const records = await pb.collection('videos').getFullList({
        sort: '-created',
        $autoCancel: false
      });

      if (records.length > 0) {
        const latestVideo = records[0];
        const url = pb.files.getUrl(latestVideo, latestVideo.video);
        setVideoUrl(url);
        setTitle(latestVideo.title || 'Introduction video');
      }
    } catch (error) {
      console.error('Error loading video:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Video must be under 100MB',
          variant: 'destructive'
        });
        return;
      }
      setVideo(file);
    }
  };

  const handleUpload = async () => {
    if (!video) {
      toast({
        title: 'No video selected',
        description: 'Please select a video file to upload',
        variant: 'destructive'
      });
      return;
    }

    if (!pb.authStore.isValid) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to upload videos',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      const formData = new FormData();
      formData.append('video', video);
      formData.append('title', title || 'Introduction video');
      formData.append('userId', pb.authStore.model.id);

      const record = await pb.collection('videos').create(formData, { $autoCancel: false });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const url = pb.files.getUrl(record, record.video);
      setVideoUrl(url);

      toast({
        title: 'Video uploaded',
        description: 'Your video has been uploaded successfully'
      });

      setVideo(null);
      setTitle('');
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload video. Please try again.',
        variant: 'destructive'
      });
    } finally {
      clearInterval(progressInterval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <section id="video" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Get to <span className="text-primary">know me</span>
        </h2>
        <p className="text-xl text-foreground/70 mb-16 text-center">
          Watch my introduction video
        </p>

        {videoUrl ? (
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
            <video
              controls
              className="w-full rounded-xl shadow-lg"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23111827' width='800' height='450'/%3E%3C/svg%3E"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Play className="w-16 h-16 text-primary/50 mb-4" />
              <p className="text-foreground/70 mb-8">No video uploaded yet</p>
              
              {pb.authStore.isValid && (
                <div className="w-full max-w-md space-y-4">
                  <div>
                    <Label htmlFor="video-title" className="text-foreground/90">Video title</Label>
                    <Input
                      id="video-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Introduction video"
                      className="mt-2 bg-card/50 border-border/50 focus:border-primary text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="video-file" className="text-foreground/90">Select video (max 100MB)</Label>
                    <Input
                      id="video-file"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="mt-2 bg-card/50 border-border/50 focus:border-primary text-foreground file:text-foreground"
                    />
                  </div>

                  {video && (
                    <p className="text-sm text-foreground/70">
                      Selected: {video.name} ({(video.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}

                  {isUploading && (
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  <Button
                    onClick={handleUpload}
                    disabled={!video || isUploading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading... {uploadProgress}%
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload video
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;